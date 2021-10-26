# 233126-212995-176902
Obligatorio de Arquitectura de Software

# contendor de docker con mysql:
docker run -d --name mysqldb -p 3306:3306 -e MYSQL_ROOT_PASSWORD=root mysql:latest

# Obtener sensres por id:
GET http://localhost:3000/catalog/sensors/ESN

ejemplo: GET http://localhost:3000/catalog/sensors/S1

# Obtener todos los sensores:
GET http://localhost:3000/catalog/sensors

ejemplo: GET http://localhost:3000/catalog/sensors

# Agregar senor:
POST http://localhost:3000/catalog/sensors

ejemplo: 
curl --location --request POST 'localhost:3000/catalog/sensors/' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'ESN=S1' \
--data-urlencode 'model=modelo' \
--data-urlencode 'name=jdskldj' \
--data-urlencode 'location=jkljlkklk'