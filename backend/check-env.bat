@echo off
echo Current .env configuration:
type .env
echo.
echo.
echo If you need to change the MySQL password, edit the .env file manually.
echo Open .env file in notepad and change DB_PASSWORD= to your actual password.
echo.
echo For example, if your MySQL password is "mypassword":
echo Change: DB_PASSWORD=
echo To: DB_PASSWORD=mypassword
echo.
pause