import mysql.connector

banco = mysql.connector.connect(
    host = "localhost",
    user = "root",
    password ='root'
)

cursor = banco.cursor()

cursor.execute("CREATE SCHEMA `meubazarminhavida` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci")

print("Banco Criado")

banco.close()