use std::collections::HashSet;
use std::str::FromStr;

use tiny_skia::Color;
use tiny_skia::Pixmap;
use tiny_skia::Transform;
use usvg::fontdb::Database;
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
        width: Option<f32>,
        height: Option<f32>,
        background: Option<String>,
    ) -> Result<Vec<u8>, JsValue> {
        let fontdb = load_fonts(
            &self.fonts,
            self.serif_family.as_deref(),
            self.sans_serif_family.as_deref(),
            self.cursive_family.as_deref(),
            self.fantasy_family.as_deref(),
            self.monospace_family.as_deref(),
        );
        let faces = fontdb.faces();
        let default_font_family = if faces.is_empty() {
            "sans-serif"
        } else {
            &faces[0].family
        };
        let svg_options = OptionsRef {
            resources_dir: None,
            dpi: 96.0,
            font_family: default_font_family,
            font_size: 12.0,
            languages: &["en".to_string()],
            shape_rendering: usvg::ShapeRendering::GeometricPrecision,
            text_rendering: usvg::TextRendering::OptimizeLegibility,
            image_rendering: usvg::ImageRendering::OptimizeQuality,
            keep_named_groups: false,
            default_size: Size::new(
                width.unwrap_or(100.0).into(),
                height.unwrap_or(100.0).into(),
            )
            .ok_or_else(|| JsValue::from_str("Invalid width or height"))?,
            fontdb: &fontdb,
            image_href_resolver: &usvg::ImageHrefResolver::default(),
        };
        let scale = scale.unwrap_or(1.0);
        let tree =
            Tree::from_str(svg, &svg_options).map_err(|e| JsValue::from_str(&e.to_string()))?;
        let svg_size = tree.svg_node().size;
        let (width, height) = match (width, height) {
            (Some(w), Some(h)) => (w.round() as u32, h.round() as u32),
            (Some(w), _) => (
                w.round() as u32,
                (svg_size.height() * ((w as f64) / svg_size.width())) as u32,
            ),
            (_, Some(h)) => (
                (svg_size.width() * ((h as f64) / svg_size.height())) as u32,
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

        resvg::render(
            &tree,
            FitTo::Size(width, height),
            Transform::default(),
            pixmap.as_mut(),
        );
        pixmap
            .encode_png()
            .map_err(|e| JsValue::from_str(&e.to_string()))
    }

    #[wasm_bindgen]
    pub fn list_fonts(&self) -> Box<[JsValue]> {
        load_fonts(&self.fonts, None, None, None, None, None)
            .faces()
            .iter()
            .map(|f| &f.family)
            .collect::<HashSet<&String>>()
            .iter()
            .map(|s| JsValue::from_str(s))
            .collect::<Vec<JsValue>>()
            .into_boxed_slice()
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
