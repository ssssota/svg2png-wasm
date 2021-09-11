use fontdb::Database;
use tiny_skia::Pixmap;
use usvg::{FitTo, OptionsRef, Size, Tree};
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
#[derive(Clone)]
pub struct Converter {
    fonts: Vec<Vec<u8>>,
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
        let fontdb = load_fonts(&self.fonts);
        let svg_options = OptionsRef {
            resources_dir: None,
            dpi: 192.0,
            font_family: "",
            font_size: 0.0,
            languages: &["en".to_string()],
            shape_rendering: usvg::ShapeRendering::GeometricPrecision,
            text_rendering: usvg::TextRendering::OptimizeLegibility,
            image_rendering: usvg::ImageRendering::OptimizeQuality,
            keep_named_groups: false,
            default_size: Size::new(width.unwrap_or(1.0), height.unwrap_or(1.0)).unwrap(),
            fontdb: &fontdb,
        };
        let scale = scale.unwrap_or(1.0);
        let tree = Tree::from_str(svg, &svg_options).ok()?;
        let pixmap_size = tree.svg_node().size;

        let mut pixmap = Pixmap::new(
            (width.unwrap_or(pixmap_size.width()) * (scale as f64)).ceil() as u32,
            (height.unwrap_or(pixmap_size.height()) * (scale as f64)).ceil() as u32,
        )?;

        resvg::render(&tree, FitTo::Zoom(scale), pixmap.as_mut());
        Some(pixmap.encode_png().ok()?)
    }
}

#[wasm_bindgen(js_name = createConverter)]
pub fn create_converter() -> Converter {
    Converter { fonts: Vec::new() }
}

pub fn load_fonts(fonts: &Vec<Vec<u8>>) -> Database {
    let mut db = Database::new();
    for font in fonts {
        db.load_font_data(font.to_vec());
    }
    db
}
