# Images on the Web

## The problem

Optimizing JavaScript has been a focus for a while now. And while frameworks have gotten smaller, bundlers more effective
and JavaScript engines faster, there is one thing that has fallen by the wayside:&nbsp;&nbsp;&nbsp;**Images**.

This is especially problematic since most websites serve
[twice as much image bytes than JavaScript bytes](https://httparchive.org/reports/page-weight), optimizing each and
every byte of those images should be our main priority!<br> Serving images that are too large will not only
[hurt your seo](https://developers.google.com/search/blog/2020/05/evaluating-page-experience) but also
[hurt your users](https://whatdoesmysitecost.com/#usdCost). Most people in the world don't have the luxury of
gigabit-internet but instead rely on old DSL or even mobile connections, for example the average websites costs $0.24
with a Canadian sim card.

## The solution

Optimizing your images by hand is a tedious and error-prone process: Opening the image in Photoshop, naming and exporting each image individually, and then reference everything correctly in the HTML.
This is where imagetools comes to the rescue: simply reference your image in code, specify the needed transformations and imagetools will take care of the rest!

And the best part? The syntax is super intuitive and extensible:

```js
import Image from 'example.jpeg?w=300&h=400'
```

Will resize your image to be 300 pixels wide and 400 pixel tall, it's that easy!

> Convinced? [Read on!](install.md)
