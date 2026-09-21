"""
Extrai e otimiza (WebP) as fotos reais do Menu 2026 para public/images.
Mapa página/índice → arquivo. Rodar: python scripts/extract_menu_photos.py
"""
import io, os
import pymupdf
from PIL import Image

PDF = 'briefing/Menu Trem de Doce 2026 Oficial.pdf'
OUT = 'public/images'
d = pymupdf.open(PDF)

def load(page, idx):
    img = d[page - 1].get_images(full=True)[idx - 1]
    xref, smask = img[0], img[1]
    pix = pymupdf.Pixmap(d, xref)
    if smask:
        pix = pymupdf.Pixmap(pix, pymupdf.Pixmap(d, smask))
    if pix.n - pix.alpha >= 4:
        pix = pymupdf.Pixmap(pymupdf.csRGB, pix)
    return Image.open(io.BytesIO(pix.tobytes('png')))

# nome: (página, índice, lado máximo, manter alpha)
PLAN = {
    # Momentos especiais (galeria editorial)
    'galeria-1.webp': (1, 3, 1100, False),   # suportes dourados, vertical
    'galeria-2.webp': (6, 4, 1100, False),   # mesa de madeira vista de cima
    'galeria-3.webp': (7, 4, 1100, False),   # brownies com corações
    'galeria-4.webp': (8, 1, 1100, False),   # brownies com laço rosa
    'galeria-5.webp': (9, 6, 1100, False),   # caixinhas com flores
    # Instagram (quadrados)
    'insta-1.webp': (1, 2, 800, False),      # brigadeiros vermelhos
    'insta-2.webp': (6, 2, 800, False),      # suportes dourados em festa
    'insta-3.webp': (7, 3, 800, False),      # brownies com creme
    'insta-4.webp': (8, 5, 800, False),      # bem casado na mão
    'insta-5.webp': (9, 5, 800, False),      # caixinhas com estrelas
    'insta-6.webp': (8, 6, 800, False),      # bem casados embalados
    # Cardápio e destaques
    'cardapio-brownies.webp': (7, 1, 1100, False),   # brownies em mesa de festa
    'destaque-brigadeiros.webp': (6, 1, 1100, False), # caixa de brigadeiros
    'destaque-brownies.webp': (7, 2, 1100, False),  # caixa de brownies sobre linho
}
for name, (pg, ix, mx, alpha) in PLAN.items():
    im = load(pg, ix).convert('RGBA' if alpha else 'RGB')
    im.thumbnail((mx, mx), Image.LANCZOS)
    im.save(os.path.join(OUT, name), 'WEBP', quality=82, method=6)
    print(f'{name:26s} {im.size[0]}x{im.size[1]} {os.path.getsize(os.path.join(OUT, name)) // 1024} KB')
