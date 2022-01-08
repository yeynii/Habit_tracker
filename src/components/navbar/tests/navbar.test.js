import React from "react";
import { render, screen } from "@testing-library/react";
import Navbar from "../navbar";
import renderer from "react-test-renderer";
import "@testing-library/jest-dom";

describe('Navbar', () => {
  const habits = [
      { id: 1, name: "Reading", count: 1 },
      { id: 2, name: "Running", count: 0 }
    ];

  it('renders', () => {
    const component = renderer.create(<Navbar totalCount={4}/>)
    expect(component.toJSON()).toMatchSnapshot();
  });
})