# rollup-plugin-imageset

> Please note, while I have confidence that this module works bug-free (it's pretty simple afterall) there are no unit tests implemented to ensure this.

## Options

### `exclude`

Files to exclude

Type: _string_ | _RegExp_ | (_string_ | _RegExp_)[]<br>
Default: ""

### `include`

Files to include in the processing

Type: _string_ | _RegExp_ | (_string_ | _RegExp_)[] <br>
Default: ["**\/*.png", "**\/*.jpg", "**\/*.jpeg", "**\/*.gif"]

### `cachePath`

To speed up compile times this plugin caches images that have been compiled. See Build Performance for more details.
Use this option to use a different cache folder

Type: _string_

## Target

### `format`

Type: _'jpeg'_ | _'png'_ | _'webp'_ | _'avif'_ | _'tiff'_ | _'gif'_ | _'heif'_

### `transform`

A function that can transform the input image.
This can be used to implement custom actions such as resizing.

Parameters: (img: _Sharp_, format: _string_)<br>
Returns: _Sharp_ | _Promise<Sharp\>_

**`img`** The Sharp instance that is used to transform the image<br>
**`argument`** The target format the current instance will be transformed into
