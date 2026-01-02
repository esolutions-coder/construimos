# CONSTRUIMOS - LOREM WEB DESIGN

## ESTILOS
Los estilos deben estar relacionados con el archivo al que estan afectando en la misma jerarquía de carpetas, por ejemplo, para un archivo pages/budget/materiales.tsx debe haber un archivo assets/styles/pages/budget/materiales.scss si es necesario

## PESTAÑAS

- MATERIALES
- EQUIPOS
- MANO DE OBRA
- APUS GLOBAL
- APUS LOCAL

## APUS GLOBAL

_APUS GLOBAL_ Contiene todos los APUS cargados a la plataforma y que provienen de la base de datos, pueden ser añadidos al proyecto pero no pueden ser editados por cualquier usuario, sólo por aquel que lo creó en un principio.

`Nota: Las actualizaciones de APUS deberían contener las razones por las cuales fue actualizado, cambios de precios por ejemplo`

## APUS LOCAL

_APUS LOCAL_ son los APUS pertenecientes al proyecto en que se está trabando, pueden editarse por el usuario dueño del proyecto ya que estos son una copia del _APU GLOBAL_

# ESTILOS

## GRID

Para utilizar el elemento grid usar la clase _grid_

### COLUMNS

En el padre se deben asignar el número de columnas que se desean en la cuadrilla, la nomenclatura es de la siguiente forma:

- col*{screenSize}*{columns}

screenSize es el tamaño de la pantalla, xsm, sm, md, lg, los breakpoints son tomados de Material Design.

### GAPS

Nomenclatura

- gap*{screenSize}*{spacing}

Spacing es la medida en pixeles del espaciamiento

### SPAN

Este elemento se aplica sobre los hijos, su nomenclatura es:

- span*{screenSize}*{columSpan}

Donde columnSpan indica el número de columnas que va a ocupar el hijo en cuestión
