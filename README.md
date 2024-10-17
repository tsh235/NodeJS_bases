# Основы Node.js

## CLI - приложение

To-Do CLI & PostgreSQL
Напишите CLI-приложение для управления задачами (To-Do List).
Приложение должно позволять пользователю создавать, просматривать, обновлять  и удалять задачи.

**Требования:**
Приложение должно быть запускаемым из командной строки и принимать команды от пользователя.

Приложение должно поддерживать следующие команды:

* add <task>              : добавить новую задачу.
* list                    : вывести список всех задач.
* get <id>                : вывести информацию о задаче с указанным идентификатором.
* update <id> <newTask>   : обновить задачу с указанным идентификатором.
* status <id> <newStatus> : обновить статус задачи с указанным идентификатором.
* delete <id>             : удалить задачу с указанным идентификатором.
* save                    : сохранить список задач в указанный файл в папке пользователя

Задачи должны сохраняться в файле, чтобы они могли быть доступными между разными запусками приложения.

Приложение должно использовать модульную структуру для разделения функциональности, например, модули для работы с задачами, обработки команд и взаимодействия с файловой системой.

Настройте Базу Данных
Добавьте таблицу в базу данных todos
Перепишите приложение для работы с базой данных
