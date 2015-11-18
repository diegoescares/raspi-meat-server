### Plataforma de imágenes

#### Requisitos:
- Virtualbox https://www.virtualbox.org/
- Vagrant https://www.vagrantup.com/downloads.html
- Node / NPM

---
### Desarrollo
**Instalación**
```bash
npm install -g bower # Instala bower
npm install -g gulp # Instala gulp
bower install # Instala componentes de bower
vagrant up # Instala la imagen de la máquina virtual, y ejecuta bootstrap.sh
vagrant ssh # Se conecta a la máquina virtual via ssh
(vm)$ cd /project # Carpeta enlazada a la carpeta del proyecto
(vm)$ sudo npm install # Instala componentes de NPM
```
Esto instalará los componentes necesarios en la máquina host y en guest la imagen de Ubuntu, instalará dependencias del servidor (ver `bootstrap.sh`) e instalará componentes del proyecto vía `NPM`.

**Luego de la instalación**
Para abrir el servidor más tarde 
```
cd /project
gulp serve # Abrirá el servidor en http://localhost:3000
```
o para hacer debug con `node-inspector`

```bash
gulp debug # Abrirá el servido en http://localhost:3000 además del servidor debug en puerto por defecto (5858)
```
Para desarrollo de front end, ejecutar `gulp` dentro de la máquina **host** ( no la máquina virtual ) para compilar Stylus, Coffee, etc.


### Producción

El proyecto está pensado para ser hosteado en Heroku. Requiere addons:

- mongolab
- elasticsearch (TODO)


Configurar variables de entorno
```
NODE_ENV=production
BASE_URL=http://URL/
GCLOUD_BUCKET=GCLOUD_BUCKET_A_USAR
MANDRILL_APIKEY=APIKEY
```

---

### Notas:
#### Google Cloud Storage - certificados
Descargar archivo p12 y convertir a PEM
openssl pkcs12 -in ARCHIVO_P12.p12 -out gs-key.pem -nodes -clcerts
#### CORS en Google Cloud Storage

Por cada bucket debe configurarse CORS utilizando `gsutil` (https://cloud.google.com/storage/docs/gsutil_install?hl=en#install_archive).

ejemplo `cors.json`
```json
[
    {
      "origin": ["http://example.appspot.com"],
      "responseHeader": ["Content-Type"],
      "method": ["GET", "HEAD", "DELETE"],
      "maxAgeSeconds": 3600
    }
]
```

```bash
gsutil cors set cors.json gs://nombredelbucket
```

