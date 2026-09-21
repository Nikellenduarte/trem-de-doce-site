"""Gera as fotos dos cards de categoria (4:3) e o hero a partir das fotos enviadas pelo cliente
(briefing/fotos-drive, pasta "fotos" do Google Drive, 20/09/2026)."""
from PIL import Image, ImageOps

SRC = 'briefing/fotos-drive/'
OUT = 'public/images/'

def load(name):
    return ImageOps.exif_transpose(Image.open(SRC + name)).convert('RGB')

def crop43(im, cx=0.5, top=None, cy=0.5):
    """Recorte 4:3. Largura total quando a foto é retrato; senão, altura total centrada em cx."""
    W, H = im.size
    if W / H < 4 / 3:  # mais alta que 4:3 → corta em altura
        h = round(W * 3 / 4)
        y = round(top * H) if top is not None else round(cy * H - h / 2)
        y = max(0, min(H - h, y))
        return im.crop((0, y, W, y + h))
    w = round(H * 4 / 3)
    x = max(0, min(W - w, round(cx * W - w / 2)))
    return im.crop((x, 0, x + w, H))

def save(im, name, width=1200, quality=82):
    if im.width > width:
        im = im.resize((width, round(im.height * width / im.width)), Image.LANCZOS)
    im.save(OUT + name, quality=quality, method=6)
    print(name, im.size)

save(crop43(load('bolos.png'), top=0.205), 'categoria-bolos.webp')
# Brigadeiros: o card usa a caixa de brigadeiros do Menu 2026 (categoria-brigadeiros-menu.webp);
# a foto da mesa enviada pelo cliente já é a imagem do topo do site e ficava repetida (20/09/2026).
save(crop43(load('mimos.jpg')), 'categoria-mimos.webp')
# Festa Completa: recorte aproximado só no cenário, sem as paredes laterais nem o teto (pedido do cliente).
festa = load('festa-completa.jpg')
FW, FH = festa.size
fx0, fx1 = round(FW * 0.14), round(FW * 0.79)
fh = round((fx1 - fx0) * 3 / 4)
fy0 = round(FH * 0.19)
save(festa.crop((fx0, fy0, fx1, fy0 + fh)), 'categoria-festa-completa.webp')
# hero: mesma foto dos brigadeiros, agora em resolução maior (arco 4:5)
hero = load('brigadeiros.jpg')
W, H = hero.size
h = round(W * 5 / 4)
save(hero.crop((0, round(H * 0.12), W, round(H * 0.12) + h)), 'hero-brigadeiros.webp', width=1100, quality=84)
