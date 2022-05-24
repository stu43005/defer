# Defer

[![NPM](https://nodeico.herokuapp.com/@stu43005/defer.svg)](https://npmjs.com/package/@stu43005/defer)

## Install

Using npm:

```bash
npm install @stu43005/defer
```

## Usage

```js
import Defer from '@stu43005/defer';
import * as fs from 'fs';

async function main() {
    const defer = new Defer();
    try {
        const fd = await fs.open('someFile.txt');
        defer.defer(() => fs.close(fd));
        // ...
        // some actions with file
    } catch (error) {
        console.error(error);
    } finally {
        await defer;
    }
}
main();
```

## License

[MIT](./LICENSE)
