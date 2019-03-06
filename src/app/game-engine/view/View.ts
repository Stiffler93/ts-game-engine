type RenderFunction = (context: CanvasRenderingContext2D) => void;

export interface View {
  render: RenderFunction;
}
