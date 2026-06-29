@echo off
:: 1. Extraer la fecha actual usando PowerShell (Universal para Windows 10/11)
for /f %%i in ('powershell -NoProfile -Command "Get-Date -Format 'yyyy-MM-dd'"') do set FECHA=%%i

:: 2. Definir la ruta relativa jerárquica
set CARPETA_DESTINO=resguardos_tpi\%FECHA%

echo ====================================================
echo 📁 Creando directorio de respaldo local: .\%CARPETA_DESTINO%
echo ====================================================

:: Crea la carpeta de forma segura usando comillas por si hay espacios
if not exist "%CARPETA_DESTINO%" mkdir "%CARPETA_DESTINO%"

echo.
echo 💾 Conectando remotamente a MongoDB Atlas...
echo ⏳ Descargando base de datos 'game_store_tpi' en formato binario...
echo.

:: 3. Ejecución de mongodump (ahora lo va a encontrar en la misma carpeta)
mongodump --uri="mongodb+srv://invitado:invitado@andrelodb.f5klxwb.mongodb.net/game_store_tpi" --out="%CARPETA_DESTINO%"

echo.
echo ====================================================
echo ✅ ¡Resguardo finalizado con exito!
echo Archivos guardados en: .\%CARPETA_DESTINO%
echo ====================================================
pause