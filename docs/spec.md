# Transforms Specification

## Table of Contents

- [Syntax](#syntax)
- [Caching](#caching)
- [Transforms](#transforms)
- [Security Considerations](#security-considerations)

## How to read this document

Each transform is described in the following way:

- **Status**<br>
    Wether this directive is considered stable or not. See [Status](#status) for details.

- **Keywords**<br>
    All the keywords that trigger this transform (The keys of the key-value pairs). A single transform might be triggered by multiple keywords (e.g. `width` and `w`). URLs may never contain two keywords for the same transform.

- **Type**<br>
    The argument type this transform takes (What value the value of the key-value pair may have). A format may take multiple types, such as union types.
    The types should always be as strict as possible (e.g. _int_ instead of _number_, a string union instead of _string_ etc.)

- **(Shorthands)**<br>
    This is optional as most transforms do not expose shorthands. Shorthands allow you to omit the 'key' of the key-value pair and specify the value directly(e.g. `?webp` instead of `?format=webp`). This is useful if the transform is used a lot or if it is often used in conjunction with other transforms.
    Shorthands MUST have an empty value and MUST NOT conflict with any keywords or other shorthands

### Status
Each transform has an associated status, that indicates how stable the specification is:

- `📦 stable`<br>
    The defined interface is considered stable and will not change. Implementations that claim to be fully-featured SHOULD support this transform. Any implementation not supporting a stable feature MUST notify the user in some way.

- `🧪 experimental`<br>
    The defined interface is considered experimental and will likely change in the future. Implementations MAY support this transform, but should warn upon usage.<br>
    Each transform marked as experimental should have a corresponding GitHub issue tracking the progress towards stabilization and for users to provide feedback.

- `❗️ deprecated`<br>
    The defined transform is considered deprecated and will be removed in the future. Implementations MUST warn upon usage.

## Syntax

Transforms are specified as URL query parameters, where the key of the key-value pair corresponds to a transforms keyword.
The value of the key-value pair will be passed to the transform as the argument.
Since transforms have to be pure functions, meaning they produce the same image given the same argument the order of keywords MUST NOT matter.

```
<url>?<keyword>=<arg>&<keyword>=<arg>&...
```

Since the internal representation of the key-value pairs will likely be an object, duplicate keywords are NOT allowed and SHOULD be rejected with an error. Implementations were rejecting a request is not desirable, such as image processing servers, MUST NOT cache the invalid image (see [Caching](#caching)) and SHOULD consider alternative ways of warning (server logs etc.).

### Argumentlists
```
<url>?<keyword>=<arg1>;<arg2>;...&<keyword>=<arg1>;<arg2>;...
```
Transforms MAY optionally be specified with multiple arguments, where each argument corresponds to a unique invocation of the transform with that value.<br>
When a transform is specified with an Argumentlist the Implementation MUST transform the list of n-arguments into a set of n image configuration objects.<br>
In cases where there are multiple transforms with Argumentlists the resulting set of image configuration object will be the cartesian product of both sets.

Example:
```
url?w=1;2;3&h=1;2;3
```

wille result in the following image configuration objects:
```
{ w: 1, h: 1},
{ w: 1, h: 2},
{ w: 1, h: 3},
{ w: 2, h: 1},
{ w: 2, h: 2},
{ w: 2, h: 3},
{ w: 3, h: 1},
{ w: 3, h: 2},
{ w: 3, h: 3}
```

### Shorthand
As space is always at a premium and legibility quickly becomes and issue when dealing with multiple transformations, the transformations most commonly used MAY expose _Sharthands_. _Shorthands_ are treated the same way boolean transformations are: 
A keyword either by itself or followed with the argument `"true"`.
```
<url>?<shorthand>&<shorthand>
```
```
<url>?<shorthand>=true&<shorthand>=true
```

The only difference is that the keyword of a shorthand MUST correspond to an argument of a real transformation.

Example:
A Transformation with the keyword `foo` and possible argument _bar_ might have a shorthand called `bar`, so that the following:
```
<url>?foo=bar
```
is equivalent to:
```
<url>?bar
```

While `baz` would not be valid shorthand, since it is a valid argument for any transformation.

Only transforms that accept string union types as arguments may specify shorthands and no Shorthand may collide with the keywords of any transformation and other shorthands.

> As a rule of thumb: Shorthands should be used sparingly and only when the transformation is commonly used.

## Caching
Status: `🧪 experimental`<br>

Because most image transformations are relatively slow, transformation functions MUST produce the same image when given the same input. This allows for efficient caching of generated images in browsers and implementations.<br>
Since a single url might generate multiple images however, the steps to generate a cache key are as follows:

1. Generate image configuration objects as outlined in [Argumentlist](#argumentlist)
2. For each image configuration object:
    1. JSON stringify the object and concatenate it with th base of the original URL (i.e. the whole URL but without the query parameters)
    2. Take the hexadecimal representation of the SHA1 hashed string as the cache key for the generated image.

## Transforms

### width
Status: `📦 stable`<br>
Keywords: `width` \| `w`<br>
Type: _int_

### height
Status: `📦 stable`<br>
Keywords: `height` \| `h`<br>
Type: _int_

### format
Status: `📦 stable`<br>
Keywords: `format`<br>
Type: _avif_ \| _png_ \| _jpg_ \| _jpeg_ \| _heif_ \| _heic_ \| _tiff_ \| _gif_

### rotate
Status: `📦 stable`<br>
Keywords: `rotate`<br>
Type: _int_

### blur
Status: `📦 stable`<br>
Keywords: `rotate`<br>
Type: _float_

### background
Status: `🧪 experimental`<br>
Keywords: `background`<br>
Type: _hex-color_ (_string_)

### tint
Status: `🧪 experimental`<br>
Keywords: `tint`<br>
Type: _hex-color_ (_string_)

### fit
Status: `📦 stable`<br>
Keywords: `fit`<br>
Type: _cover_ \| _contain_ \| _fill_ \| _inside_ \| _outside_

### position
Status `📦 stable`<br>
Keywords: `position`<br>
Type: _top_ \| _right top_ \| _right_ \| _right bottom_ \| _bottom_ \| _left bottom_ \| _left_ \| _left top_ \|
    _north_ \| _northeast_ \| _east_ \| _southeast_ \| _south_ \| _southwest_ \| _west_ \| _northwest_ \| _center_ \| _centre_ \|
    _entropy_ \| _attention_

### kernel
Status: `📦 stable`<br>
Keywords: `kernel`<br>
Type: _nearest_ \| _cubic_ \| _mitchell_ \| _lanczos2_ \| _lanczos3_

### grayscale
Status: `📦 stable`<br>
Keywords: `grayscale`<br>
Type: _boolean_ 

### flatten
Status: `📦 stable`<br>
Keywords: `flatten`<br>
Type: _boolean_ 

### hue
Status: `📦 stable`<br>
Keywords: `hue`<br>
Type: _int_

### saturation
Status: `📦 stable`<br>
Keywords: `saturation`<br>
Type: _float_

### brightness
Status: `📦 stable`<br>
Keywords: `brightness`<br>
Type: _float_

### metadata
Status: `📦 stable`<br>
Keywords: `metadata` | `meta`<br>
Type: _boolean_

### srcset 
Status: `🧪 experimental`
Keywords: `srcset`
Type: _boolean_

## Security Considerations

1. Transforming user-provided is dangerous
2. Strip image metadata unless explicitly requested
3. Limit the number of Arguments per Argumentlist & Number of Argumentlists
4. Consider limits for numeric arguments