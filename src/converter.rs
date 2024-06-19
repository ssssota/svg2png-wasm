use std::collections::HashSet;
use std::str::FromStr;

use resvg::usvg::NodeExt;
use resvg::{
    tiny_skia::{Color, IntSize, Pixmap, Transform},
    usvg::{fontdb::Database, Options, Size, Tree, TreeParsing, TreeTextToPath},
};
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub struct BBox {
    pub x: f64,
    pub y: f64,
    pub width: f64,
    pub height: f64,
}

#[wasm_bindgen]
#[derive(Clone)]
pub struct Converter {
    fonts: Vec<Vec<u8>>,
    serif_family: Option<String>,
    sans_serif_family: Option<String>,
    cursive_family: Option<String>,
    fantasy_family: Option<String>,
    monospace_family: Option<String>,
    tree: Option<Box<Tree>>,
}

#[wasm_bindgen]
impl Converter {
    #[wasm_bindgen(js_name = registerFont)]
    pub fn register_font(&mut self, font: &[u8]) {
        self.fonts.push(font.to_vec());
    }

    // Side-effectful method which parses the SVG into a tree and stores the returned
    // mutable reference on the Converter
    #[wasm_bindgen]
    pub fn parse_tree(&mut self, svg: &str) {
        let fontdb = load_fonts(
            &self.fonts,
            self.serif_family.as_deref(),
            self.sans_serif_family.as_deref(),
            self.cursive_family.as_deref(),
            self.fantasy_family.as_deref(),
            self.monospace_family.as_deref(),
        );
        let faces = &mut fontdb.faces();
        let default_font_family = if fontdb.is_empty() {
            "sans-serif".to_string()
        } else {
            faces.next().unwrap().families[0].0.to_string()
        };
        let svg_options = Options {
            resources_dir: None,
            dpi: 96.0,
            font_family: default_font_family.clone(),
            font_size: 12.0,
            languages: vec!["en".to_string()],
            shape_rendering: resvg::usvg::ShapeRendering::GeometricPrecision,
            text_rendering: resvg::usvg::TextRendering::OptimizeLegibility,
            image_rendering: resvg::usvg::ImageRendering::OptimizeQuality,
            default_size: Size::from_wh(100.0, 100.0).unwrap(),
            image_href_resolver: resvg::usvg::ImageHrefResolver::default(),
        };

        let mut tree = Tree::from_str(svg, &svg_options)
            .map_err(|e| JsValue::from_str(&e.to_string()))
            .unwrap_throw();

        tree.convert_text(&fontdb);
        self.tree = Some(Box::new(tree));
    }

    #[wasm_bindgen]
    pub fn convert(
        &self,
        scale: Option<f32>,
        width: Option<f32>,
        height: Option<f32>,
        background: Option<String>,
    ) -> Result<Vec<u8>, JsValue> {
        let tree = self
            .tree
            .as_ref()
            .ok_or_else(|| JsValue::from_str("Tree not parsed"))?;
        let scale = scale.unwrap_or(1.0);
        let svg_size = tree.size;

        let (width, height) = match (width, height) {
            (Some(w), Some(h)) => (w.round() as u32, h.round() as u32),
            (Some(w), _) => (
                w.round() as u32,
                (svg_size.height() * (w / svg_size.width())) as u32,
            ),
            (_, Some(h)) => (
                (svg_size.width() * (h / svg_size.height())) as u32,
                h.round() as u32,
            ),
            _ => (
                ((svg_size.width().round() as f32) * scale) as u32,
                ((svg_size.height().round() as f32) * scale) as u32,
            ),
        };

        let mut pixmap = Pixmap::new(width, height)
            .ok_or_else(|| JsValue::from_str("Invalid width or height"))?;

        if let Some(color) = background {
            pixmap.fill(parse_color_string(&color));
        }

        let rtree = resvg::Tree::from_usvg(&tree);

        let size = tree.size.to_int_size();
        let size1 = size.to_size();
        let fit_to_size = IntSize::from_wh(width, height).map(|s| size.scale_to(s));
        let size2 = match fit_to_size {
            Some(v) => v.to_size(),
            None => size.to_size(),
        };

        let tx = Transform::from_scale(
            (size2.width() / size1.width()) as f32,
            (size2.height() / size1.height()) as f32,
        );

        rtree.render(tx, &mut pixmap.as_mut());

        pixmap
            .encode_png()
            .map_err(|e| JsValue::from_str(&e.to_string()))
    }

    #[wasm_bindgen]
    pub fn list_fonts(&self) -> Box<[JsValue]> {
        load_fonts(&self.fonts, None, None, None, None, None)
            .faces()
            .map(|f| &f.families[0].0)
            .collect::<HashSet<&String>>()
            .iter()
            .map(|s| JsValue::from_str(s))
            .collect::<Vec<JsValue>>()
            .into_boxed_slice()
    }

    #[wasm_bindgen(js_name = getBBox)]
    /// Calculate a maximum bounding box of all visible elements in this SVG.
    /// This will first apply transform.
    /// Similar to `SVGGraphicsElement.getBBox()` DOM API.
    pub fn get_bbox(&self) -> Option<BBox> {
        let tree = self.tree.as_ref().unwrap();
        let bbox = tree.root.calculate_bbox()?;
        Some(BBox {
            x: bbox.x() as f64,
            y: bbox.y() as f64,
            width: bbox.width() as f64,
            height: bbox.height() as f64,
        })
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
        tree: None, // Tree is not initialised until parse_tree() is called
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
    if let Some(f) = default_serif_family {
        db.set_serif_family(f.to_string())
    }
    if let Some(f) = default_sans_serif_family {
        db.set_sans_serif_family(f.to_string())
    }
    if let Some(f) = default_cursive_family {
        db.set_cursive_family(f.to_string())
    }
    if let Some(f) = default_fantasy_family {
        db.set_fantasy_family(f.to_string())
    }
    if let Some(f) = default_monospace_family {
        db.set_monospace_family(f.to_string())
    }
    db
}

fn parse_color_string(color: &str) -> Color {
    match svgtypes::Color::from_str(color) {
        Err(_) => Color::TRANSPARENT,
        Ok(c) => Color::from_rgba8(c.red, c.green, c.blue, c.alpha),
    }
}
