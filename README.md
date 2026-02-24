Bienestar360 - Backend Clínica Médica

Bienvenidos al backend de nuestro proyecto del segundo módulo de programación.
Este proyecto complementa la aplicación web de la clínica médica ⚕️, ofreciendo la lógica de negocio, la gestión de datos y la conexión con la base de datos.

📌 Descripción del proyecto

El backend está desarrollado con Node.js y Express, y se encarga de manejar toda la información de pacientes, médicos, turnos y guardias.
Su objetivo es centralizar la gestión de datos de la clínica, permitiendo que la aplicación frontend consulte y modifique la información de manera segura y eficiente.

Los módulos principales son:

🔐 1. Autenticación y Autorización

El sistema cuenta con rutas protegidas según el rol de cada usuario:

Pacientes: pueden iniciar sesión y consultar su historia clínica.

Médicos: pueden iniciar sesión para acceder a funciones profesionales, como registrar diagnósticos o modificar información de turnos.

Administradores: pueden gestionar usuarios y recursos del sistema.

👨‍⚕️🧑‍💻🙍 Roles

Administrador: Puede crear, modificar y eliminar cualquier recurso del sistema.

Profesional de la Salud: Puede crear, modificar y eliminar únicamente los recursos asociados a su labor.

Visitante / Paciente: Solo puede visualizar información permitida mediante la API.

🔗 Endpoints principales

/api/auth/login → Inicio de sesión.

/api/pacientes → CRUD de pacientes.

/api/medicos → CRUD de médicos.

/api/historia-clinica → CRUD de historias clínicas.

Todos los endpoints están protegidos por roles y autenticación JWT.

🔧 Instalación y ejecución

En la terminal del proyecto, ejecute los siguientes comandos:

npm install o npm i

Configurar variables de entorno en .env (como puerto, URI de base de datos y secret de JWT)

npm start → Inicia el servidor en el puerto configurado
