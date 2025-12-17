SISPA – Backend

Backend del proyecto SISPA desarrollado con Node.js, Express, MySQL y MongoDB.
El sistema utiliza MySQL para datos relacionales y MongoDB para manejo de colecciones específicas, funcionando ambas bases de datos de manera independiente y funcional.

🛠 Tecnologías

Node.js

Express

MySQL

MongoDB (Mongoose)

Git

📋 Requisitos

Antes de ejecutar el proyecto asegúrese de tener instalado:

Node.js

MySQL

MongoDB

Git

📥 Clonar el repositorio
git clone https://github.com/lauraSofia123/backend_sispa.git
cd sispa-backend

📦 Instalar dependencias
npm install

⚙ Configurar variables de entorno

Crear un archivo .env en la raíz del proyecto con el siguiente contenido:

PORT=8000

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=sispa
DB_PORT=3306

MONGO_URI=mongodb://localhost:27017/sispa

🗄 Base de datos MySQL

Crear la base de datos en MySQL:

CREATE DATABASE sispa;

▶ Ejecutar el proyecto
npm run dev


Si todo está correcto, el servidor quedará activo en:

http://localhost:8000

🔗 Endpoints principales
MongoDB – Aprendices

Obtener aprendices:

GET /api/mongo/aprendices


Obtener aprendiz por ID:

GET /api/mongo/aprendices/:id


Crear aprendiz:

POST /api/mongo/aprendices


Actualizar aprendiz:

PUT /api/mongo/aprendices/:id


Eliminar aprendiz:

DELETE /api/mongo/aprendices/:id

MySQL – Instructores / Faltas (según módulo)

Ejemplo:

GET /api/mysql/instructores
POST /api/mysql/faltas
