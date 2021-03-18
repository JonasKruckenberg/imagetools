## The basics

```js
import Image from 'example.jpeg?w=300&h=400'
```

## Generating multiple images

```js
import Image from 'example.jpeg?w=300;500;700&h=400'
```

```
example.jpg?w=300;500;700
  └-> example.jpg width: 300, height: 400
  └-> example.jpg width: 500, height: 400
  └-> example.jpg width: 700, height: 400
```

```js
import Image from "example.jpeg?w=300;500;700&h=120;600;1200"
```

```
example.jpg?w=300;500;700&h=120;600;1200
  └-> example.jpg width: 300, height: 120
  └-> example.jpg width: 500, height: 120
  └-> example.jpg width: 700, height: 120
  └-> example.jpg width: 300, height: 600
  └-> example.jpg width: 500, height: 600
  └-> example.jpg width: 700, height: 600
  └-> example.jpg width: 300, height: 1200
  └-> example.jpg width: 500, height: 1200
  └-> example.jpg width: 700, height: 1200
```

## Generating a srcset

```js
import Image from "example.jpeg?w=300;400;500&srcset"
```

```
example-fe65d.jpeg 300w, example-ea88e.jpeg 400w, example-af229.jpeg 500w
```

## Putting it together

```html
<picture>
    <source srcset="example.jpeg?w=400;700;1200;2000&avif" type="image/avif">
    <source srcset="example.jpeg?w=400;700;1200;2000&webp" type="image/webp">
    <source srcset="example.jpeg?w=400;700;1200;2000&format=jpeg&progressive" type="image/jpeg">
    <img src="example.jpeg?w=200&h=400&blur=15&format=webp&srcset" width="200" height="400">
</picture>
```