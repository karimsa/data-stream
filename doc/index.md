# API docs

All supported transforms are grouped by category, but in usage
all transforms are available in the root of the object and are not
especially categorized. For example, a transform with the name
`transform` will be available as `data().transform()`.

## General methods

 - `take(stream)`: use `stream` as input (reverse of pipe).
 - `and(stream)`: merge streams with `stream`.
 - `append(stream)`: add `stream` to the end of the stream line.
 - `clone()`: clone current data-stream into new stream.

## Categories

 - [Utility methods](utils.md)
 - [Array methods](array.md)
 - [Math methods](math.md)