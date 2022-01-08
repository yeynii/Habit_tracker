import React from 'react'
import {render, screen} from '@testing-library/react'
import '@testing-library/jest-dom'
import AddForm from '../addform'
import userEvent from '@testing-library/user-event'

describe('AddForm', () => {
    let onAdd;
    let input;
    let button;

    beforeEach(() => {
        onAdd = jest.fn()
        render(<AddForm onAdd={onAdd}/>)
        input = screen.getByPlaceholderText('Habit');
        button = screen.getByText('Add');
    })

    it('버튼 클릭하면 onAdd 호출', () => {
        userEvent.type(input, "윤이");
        userEvent.click(button);

        expect(onAdd).toHaveBeenCalledTimes(1)
        expect(onAdd).toHaveBeenCalledWith('윤이');
    });

    it('빈 input 넘길 경우 onAdd 호출안함', () => {
        userEvent.click(button)
        expect(onAdd).toHaveBeenCalledTimes(0)
    });

    it('onAdd 후 input 값 비움', () => {
        userEvent.type(input, "윤이");
        userEvent.click(button);

        expect(input.value).toBe('');
        expect(onAdd).toHaveBeenCalledTimes(1)
    });
})