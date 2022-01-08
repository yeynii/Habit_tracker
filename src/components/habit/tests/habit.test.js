import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import Habit from "../habit";
import renderer from "react-test-renderer";

describe("Habit", () => {
  const habit = { id: 1, name: "Coding", count: 3 };
  it("snapshot Test", () => {
    const component = renderer.create(
      <Habit
        habit={habit}
        onIncrement={jest.fn()}
        onDecrement={jest.fn()}
        onDelete={jest.fn()}
      />
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  describe("component Test", () => {
    let handleIncrement;
    let handleDecrement;
    let handleDelete;

    beforeEach(() => {
      handleIncrement = jest.fn();
      handleDecrement = jest.fn();
      handleDelete = jest.fn();
      render(
        <Habit
          habit={habit}
          onIncrement={handleIncrement}
          onDecrement={handleDecrement}
          onDelete={handleDelete}
        />
      );
    });

    it('increase click test',() => {
      const button = screen.getByTitle("increase");
      userEvent.click(button);
      expect(handleIncrement).toHaveBeenCalledTimes(1);
      expect(handleIncrement).toHaveBeenCalledWith(habit);
    });

    it('decrease click test',() => {
      const button = screen.getByTitle("decrease");
      userEvent.click(button);
      expect(handleDecrement).toHaveBeenCalledTimes(1);
      expect(handleDecrement).toHaveBeenCalledWith(habit);
    });

    it('delete click test',() => {
      const button = screen.getByTitle("delete");
      userEvent.click(button);
      expect(handleDelete).toHaveBeenCalledTimes(1);
      expect(handleDelete).toHaveBeenCalledWith(habit);
    });
  });
});
