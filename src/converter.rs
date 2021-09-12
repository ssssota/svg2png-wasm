use fontdb::Database;
use tiny_skia::Pixmap;
use usvg::{FitTo, OptionsRef, Size, Tree};
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
#[derive(Clone)]
pub struct Converter {
    fonts: Vec<Vec<u8>>,
    serif_family: Option<String>,
    sans_serif_family: Option<String>,
    cursive_family: Option<String>,
    fantasy_family: Option<String>,
    monospace_family: Option<String>,
}

#[wasm_bindgen]
impl Converter {
    #[wasm_bindgen(js_name = registerFont)]
    pub fn register_font(&mut self, font: &[u8]) {
        self.fonts.push(font.to_vec());
    }

    #[wasm_bindgen]
    pub fn convert(
        &self,
        svg: &str,
        scale: Option<f32>,
        width: Option<f64>,
        height: Option<f64>,
    ) -> Option<Vec<u8>> {
        let fontdb = load_fonts(
            &self.fonts,
            self.serif_family.as_ref().map(|s| s.as_str()),
            self.sans_serif_family.as_ref().map(|s| s.as_str()),
            self.cursive_family.as_ref().map(|s| s.as_str()),
            self.fantasy_family.as_ref().map(|s| s.as_str()),
            self.monospace_family.as_ref().map(|s| s.as_str()),
        );
        let svg_options = OptionsRef {
            resources_dir: None,
            dpi: 96.0,
            font_family: "sans-serif",
            font_size: 12.0,
            languages: &["en".to_string()],
            shape_rendering: usvg::ShapeRendering::GeometricPrecision,
            text_rendering: usvg::TextRendering::OptimizeLegibility,
            image_rendering: usvg::ImageRendering::OptimizeQuality,
            keep_named_groups: false,
            default_size: Size::new(width.unwrap_or(100.0), height.unwrap_or(100.0)).unwrap(),
            fontdb: &fontdb,
        };
        let scale = scale.unwrap_or(1.0);
        let tree = Tree::from_str(svg, &svg_options).ok()?;
        let pixmap_size = tree.svg_node().size;

        let mut pixmap = Pixmap::new(
            (width.unwrap_or_else(|| pixmap_size.width()) * (scale as f64)).ceil() as u32,
            (height.unwrap_or_else(|| pixmap_size.height()) * (scale as f64)).ceil() as u32,
        )?;

        resvg::render(&tree, FitTo::Zoom(scale), pixmap.as_mut());
        pixmap.encode_png().ok()
    }
}

#[wasm_bindgen(js_name = createConverter)]
pub fn create_converter(
    default_serif_family: Option<String>,
    default_sans_serif_family: Option<String>,
    default_cursive_family: Option<String>,
    default_fantasy_family: Option<String>,
    default_monospace_family: Option<String>,
) -> Converter {
    Converter {
        fonts: Vec::new(),
        serif_family: default_serif_family,
        sans_serif_family: default_sans_serif_family,
        cursive_family: default_cursive_family,
        fantasy_family: default_fantasy_family,
        monospace_family: default_monospace_family,
    }
}

pub fn load_fonts(
    fonts: &[Vec<u8>],
    default_serif_family: Option<&str>,
    default_sans_serif_family: Option<&str>,
    default_cursive_family: Option<&str>,
    default_fantasy_family: Option<&str>,
    default_monospace_family: Option<&str>,
) -> Database {
    let mut db = Database::new();
    for font in fonts {
        db.load_font_data(font.to_vec());
    }
    default_serif_family.map(|f| db.set_serif_family(f.to_string()));
    default_sans_serif_family.map(|f| db.set_sans_serif_family(f.to_string()));
    default_cursive_family.map(|f| db.set_cursive_family(f.to_string()));
    default_fantasy_family.map(|f| db.set_fantasy_family(f.to_string()));
    default_monospace_family.map(|f| db.set_monospace_family(f.to_string()));
    db
}
