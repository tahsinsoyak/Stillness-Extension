import os
import re
from playwright.sync_api import sync_playwright

def main():
    sizes = [16, 32, 48, 128]
    svg_path = os.path.abspath("assets/icons/zen-ripple-wave.svg")
    out_dir = os.path.abspath("public/icons")
    
    os.makedirs(out_dir, exist_ok=True)
    
    with open(svg_path, "r", encoding="utf-8") as f:
        svg_content = f.read()
        
    # Remove the background rect so the icon is completely transparent
    svg_content_clean = re.sub(r'<rect[^>]*fill="#141416"[^>]*/>', '', svg_content)
    
    html_content = f"""
    <!DOCTYPE html>
    <html>
    <head>
    <style>
      body, html {{
        margin: 0;
        padding: 0;
        overflow: hidden;
        background: transparent;
        width: 100%;
        height: 100%;
      }}
      svg {{
        width: 100%;
        height: 100%;
        display: block;
      }}
    </style>
    </head>
    <body>
      {svg_content_clean}
    </body>
    </html>
    """
    
    temp_html = os.path.abspath("temp_icon.html")
    with open(temp_html, "w", encoding="utf-8") as f:
        f.write(html_content)
        
    try:
        with sync_playwright() as p:
            browser = p.chromium.launch(headless=True)
            page = browser.new_page()
            
            for size in sizes:
                page.set_viewport_size({"width": size, "height": size})
                page.goto(f"file://{temp_html}")
                page.wait_for_timeout(100)
                
                out_path = os.path.join(out_dir, f"icon{size}.png")
                page.screenshot(path=out_path, omit_background=True)
                print(f"Generated {out_path} ({size}x{size}) with transparent background")
                
            browser.close()
    finally:
        if os.path.exists(temp_html):
            os.remove(temp_html)

if __name__ == "__main__":
    main()
