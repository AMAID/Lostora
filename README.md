# Lostora
A localStorage handler to support Object or JSON

## Usage
### Install
### API
#### Lostora.set(key,value)
> `Lostora.set("foo","bar")`
>
> `console.log(localStorage)`
>
> Storage {foo: "bar", length: 1}
>
> `Lostora.set("baz",{baz:"qux"})`
>
> `console.log(localStorage)`
>
> Storage {baz: "{"baz":"qux"}", foo: "bar", length: 2}
