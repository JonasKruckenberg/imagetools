# rollup-plugin-imageset

> Please note, while I have confidence that this module works bug-free (it's pretty simple afterall) there are no unit tests implemented to ensure this.

## Options

### `disable`

Type: _boolean_

### `exclude`

Files to exclude

Type: _string_ | _RegExp_ | (_string_ | _RegExp_)[]<br>
Default: ""

### `include`

Files to include in the processing

Type: _string_ | _RegExp_ | (_string_ | _RegExp_)[] <br>
Default: ["**\/*.png", "**\/*.jpg", "**\/*.jpeg", "**\/*.gif"]

### transform

A function that can transform the input image.
This can be used to implement custom actions such as resizing.

Parameters: (sharp: _Sharp_, format: _string_)<br>
Returns: _Sharp_ | _Promise<Sharp\>_

**`sharp`** The Sharp instance that is used to transform the image<br>
**`argument`** The target format the current instance will be transformed into

### jpeg

The Sharp jepg settings.
For further details and default value see: https://sharp.pixelplumbing.com/api-output#jpeg
Set to false to disable jpeg output

Type: _boolean_ | _JpegOptions_

### webp

The Sharp webp settings.
For further details and default value see: https://sharp.pixelplumbing.com/api-output#jpeg
Set to false to disable webp output

Type: _boolean_ | WebpOptions

### avif

The Sharp avif settings.
For further details and default value see: https://sharp.pixelplumbing.com/api-output#jpeg
Set to false to disable avif output

Type: _boolean_ | AvifOptions

### png

The Sharp png settings.
For further details and default value see: https://sharp.pixelplumbing.com/api-output#jpeg
By default no png output is produced, you can reenable this by setting this property to true or providing options.

Type: _boolean_ | PngOptions
Default: false

### tiff

The Sharp tiff settings.
For further details see: https://sharp.pixelplumbing.com/api-output#jpeg
By default no tiff output is produced, you can reenable this by setting this property to true or providing options.

Type: _boolean_ | TiffOptions
Default: false
