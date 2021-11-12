import axios from 'axios';
// import { showLoader } from '../loader';
import { getItemsRequest } from '../requests';
import { showLoader, hideLoader } from '../loader';

jest.mock('axios');

/**
 * Объект с успешно возвращёнными данными.
 * Отдельная константа, чтобы не повторять код в моке реализации и в проверке.
 */
const mockedResponse = { result: 'ok' };

/**
 * Объект ошибки для мока реализации.
 * Отдельная константа, чтобы не повторять код в моке реализации и в проверке.
 */
const errorResponse = new Error('Error!');

describe('Группа тестов.', () => {
    beforeAll(() => {
        axios.get
            .mockImplementationOnce(
                () => Promise.resolve(mockedResponse),
            )
            .mockImplementationOnce(
                () => Promise.reject(errorResponse),
            );
    });

    afterAll(() => {
        axios.get.mockRestore();
    });

    /**
    * Два теста ниже, конечно синтетические.
    * По сути, они проверяют только то, что наш мок работает и axios не делает реальный запрос за данными.
    * Сделаны для примера того, как проверять успешный и неуспешный промис.
    */
    test('Запрос в axios должен разрешиться положительно.', () => (
        expect(axios.get('http://example.com')).resolves.toEqual(mockedResponse)
    ));

    test('Запрос в axios должен отклониться.', () => (
        expect(axios.get('http://example.com')).rejects.toEqual(errorResponse)
    ));

    /**
    * Тут более реальный пример тестирования:
    *
    * 1. Мы импортировали функцию, которую хотим протестировать.
    * 2. Создали мок запроса axios с фейковыми данными.
    * 3. Вызываем тестируемую функцию.
    * 4. Проверяем, что промис, возвращаемый функцией, разрешается данными, которые мы передали в мок.
    *
    * Точно также можно тестировать rejected промисы.
    */
    test('Пример тестирования реального запроса (getItemsRequest).', () => {
        const data = [{
            id:    1,
            title: 'Заголовок 1',
        }, {
            id:    2,
            title: 'Заголовок 2',
        }];

        axios.get.mockImplementationOnce(
            () => Promise.resolve(data),
        );

        return expect(getItemsRequest()).resolves.toEqual(data);
    });
});

describe('Тест событий', () => {
    let handlerClick;

    beforeAll(() => {
        handlerClick = jest.fn();

        const body = document.querySelector('body');
        const button = document.createElement('button');

        body.innerHTML += button;

        button.addEventListener('click', handlerClick);

        button.click();
    });

    test('Проверка вызова по клику на кнопку', () => {
        expect(handlerClick).toHaveBeenCalled();
    });
});

describe(('Тест на добавление контента на страницу в блок #app.'), () => {
    const body = document.querySelector('body');

    beforeAll(() => {
        const app = document.createElement('div');

        app.id = 'app';

        body.innerHTML += app;
    });

    afterAll(() => {
        body.innerHTML = '';
    });

    test('тест на проверку добавления контента', () => {
        expect(beforeAll).toMatchSnapshot();
    });
});

describe('Тест на отображение и скрытие лоадера.', () => {
    const loader = document.createElement('h1');

    loader.id = 'loader';

    document.querySelector('body').append(loader);

    test('Тест на отображение лоадера', () => {
        showLoader();
        expect(loader.style.display).toEqual('block');
    });

    test('Тест на скрытие лоадера', () => {
        hideLoader();
        expect(loader.style.display).toEqual('none');
    });
});
