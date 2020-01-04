use wasm_bindgen::prelude::*;

#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

#[wasm_bindgen]
extern "C" {
    pub fn alert(s: &str);

    #[wasm_bindgen(js_namespace = console)]
    pub fn log(s: &str);
}

// #[wasm_bindgen]
// pub fn greet(name: &str) {
//     alert(&format!("Hello, {}!", name));
// }

#[wasm_bindgen]
#[derive(Debug)]
pub struct Counter {
    key: char,
    count: i32,
}

#[wasm_bindgen]
impl Counter {
    pub fn default() -> Counter {
        log("Counter::default");
        Self::new('a', 0)
    }

    pub fn new(key: char, count: i32) -> Counter {
        log(&format!("Counter::new({}, {})", key, count));
        Counter { key, count }
    }

    pub fn key(&self) -> char {
        log("Counter.key()");
        self.key
    }

    pub fn count(&self) -> i32 {
        log("Counter.count()");
        self.count
    }

    pub fn increment(&mut self) {
        log("Counter.increment()");
        self.count += 1;
    }

    pub fn decrement(&mut self) {
        log("Counter.decrement()");
        self.count -= 1;
    }

    pub fn update_key(&mut self, key: char) {
        self.key = key;
    }
}
