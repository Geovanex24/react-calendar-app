import { fireEvent, render, screen } from "@testing-library/react";
import { FabDelete } from "../../../src/calendar/components/FabDelete";
import { useCalendarStore } from "../../../src/hooks/useCalendarStore";

jest.mock("../../../src/hooks/useCalendarStore"); // Mock específico del hook 'useCalendarStore' para evitar hacer mocks de todos los hooks

describe("Pruebas en <FabDelete />", () => {
  const mockStartDeletingEvent = jest.fn();
  beforeEach(() => jest.clearAllMocks());

  test("debe de mostrar el componente correctamente", () => {
    useCalendarStore.mockReturnValue({
      hasEventSelected: false,
    });
    render(<FabDelete />);

    const btn = screen.getByLabelText("btn-delete");

    // console.log(btn.classList.toString());
    expect(btn.classList).toContain("btn");
    expect(btn.classList).toContain("btn-danger");
    expect(btn.classList).toContain("fab-danger");
    expect(btn.style.display).toBe("none"); // Aserción principal de esta prueba: asegurarse de que esté en 'none'
  });
  test("debe de mostrar el botón si hay un evento activo", () => {
    useCalendarStore.mockReturnValue({
      hasEventSelected: true,
    });
    render(<FabDelete />);

    const btn = screen.getByLabelText("btn-delete");

    // console.log(btn.classList.toString());

    expect(btn.style.display).toBe(""); // Aserción principal de esta prueba: asegurarse de que esté en ''
  });
  test("debe de llamar startDeletingEvent si hay evento activo", () => {
    useCalendarStore.mockReturnValue({
      hasEventSelected: true,
      startDeletingEvent: mockStartDeletingEvent,
      // startDeletingEvent: jest.fn(),
    });
    render(<FabDelete />);

    const btn = screen.getByLabelText("btn-delete");
    fireEvent.click(btn);

    expect(mockStartDeletingEvent).toHaveBeenCalledWith();
  });
});
