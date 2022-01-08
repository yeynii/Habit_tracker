import React from "react";
import "@testing-library/jest-dom";
import renderer from "react-test-renderer";
import App from "../app";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import HabitPresenter from '../habit_presenter';

describe("App integration test", () => {
  let presenter;
  beforeEach(() => {
    presenter = new HabitPresenter([
      { id: 1, name: "Reading", count: 4 },
      { id: 2, name: "Eating", count: 0 },
    ]);
  })
  it("renders", () => {
    const component = renderer.create(<App presenter={presenter} />);
    expect(component.toJSON()).toMatchSnapshot();
  });

  describe("Component", () => {
    beforeEach(() => {
      render(<App presenter={presenter} />);
    });

    it('활성화 된 habit수 카운트', () => {
      const button = screen.getAllByTitle('increase')[1];
      userEvent.click(button);
      const count = screen.getByTestId('total-count');
      expect(count.innerHTML).toBe('2');
    });

    it('Add', () => {
      const input = screen.getByPlaceholderText('Habit');
      const button = screen.getByText('Add');
      const newHabit = 'New Habit';
      userEvent.type(input, newHabit);
      userEvent.click(button);
      const addedName = screen.getAllByTestId('habit-name')[2];
      const addedCount = screen.getAllByTestId('habit-count')[2];
      expect(addedName.innerHTML).toBe(newHabit);
      expect(addedCount.innerHTML).toBe('0');
    });

    it('Increase', () => {
      const button = screen.getAllByTitle('increase')[0];
      const count = screen.getAllByTestId('habit-count')[0];
      userEvent.click(button);
      expect(count.innerHTML).toBe('5');
    });

    it('Decrease', () => {
      const button = screen.getAllByTitle('decrease')[0];
      const count = screen.getAllByTestId('habit-count')[0];
      userEvent.click(button);
      expect(count.innerHTML).toBe('3');
    });
    
    it('Delete', () => {
      const button = screen.getAllByTitle('delete')[0];
      userEvent.click(button);
      const next = screen.getAllByTestId('habit-name')[0];
      expect(next.innerHTML).toBe('Eating');
    });

    it('Reset', () => {
      const button = screen.getByTitle('reset');
      userEvent.click(button);
      const activeCount = screen.getByTestId('total-count');
      expect(activeCount.innerHTML).toBe('0');
      screen.getAllByTestId('habit-count').forEach(count => expect(count.innerHTML).toBe('0'));
    });


  });
});
