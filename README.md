# nuxt-simple-blog

Простой проект на Nuxt.js с использованием хранилища состояний Vuex. Авторизация и аутентификация реализована через Express + Express Session. Аутентификация пользователя происходит по простейшему Access Token, генерирующемуся при логине пользователя. Пользователь может добавлять добавлять комментарии к статье.
"БД" проекта реализована через JSON-файлы.

Исходные пользователи
| Логин | Пароль |
|-------|--------|
| admin | 123456 |
| user  | 12345  |

## Команды

``` bash
# для установки всех зависимостей
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```
