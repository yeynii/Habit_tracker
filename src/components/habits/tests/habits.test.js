import React from "react";
import "@testing-library/jest-dom";
import renderer from "react-test-renderer";
import Habits from "../habits";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("Habits", () => {
  const habits = [
    { id: 1, name: "Reading", count: 4 },
    { id: 2, name: "Eating", count: 0 }
  ];
  let HabitsComponent;
  let onIncrement;
  let onDecrement;
  let onDelete;
  let onAdd;
  let onReset;

  beforeEach(() => {
    onIncrement = jest.fn();
    onDecrement = jest.fn();
    onDelete = jest.fn();
    onAdd = jest.fn();
    onReset  = jest.fn();
    HabitsComponent = (
      <Habits
        habits={habits}
        onIncrement={onIncrement}
        onDecrement={onDecrement}
        onDelete={onDelete}
        onAdd={onAdd}
        onReset={onReset}
      />
    )
  });

  it('renders', () => {
    const component = renderer.create(HabitsComponent);
    expect(component.toJSON()).toMatchSnapshot();
  })


  describe('Button Click', () => {
    beforeEach(() => {
      render(HabitsComponent);
    });

    it('Add button 클릭시 onAdd 호출', () => {
      const input = screen.getByPlaceholderText('Habit');
      const button = screen.getByText('Add');
      const newHabit = 'New Habit';
      userEvent.type(input, newHabit);
      userEvent.click(button);
      expect(onAdd).toHaveBeenCalledWith(newHabit);
    });

    it('increase button 클릭시 onIncrement 호출', () => {
      const button = screen.getAllByTitle('increase')[0];
      userEvent.click(button);
      expect(onIncrement).toHaveBeenCalledWith(habits[0]);
    });

    it('decrease button 클릭시 onDecrement 호출', () => {
      const button = screen.getAllByTitle('decrease')[0];
      userEvent.click(button);
      expect(onDecrement).toHaveBeenCalledWith(habits[0]);
    });
    
    it('delete button 클릭시 onDelete 호출', () => {
      const button = screen.getAllByTitle('delete')[0];
      userEvent.click(button);
      expect(onDelete).toHaveBeenCalledWith(habits[0]);
    });

    it('reset button', () => {
      const button = screen.getByTitle('reset');
      userEvent.click(button);
      expect(onReset).toHaveBeenCalledTimes(1);
    });
  })
})