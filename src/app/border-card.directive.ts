import { Directive, ElementRef, HostListener, Input } from "@angular/core";

@Directive({
  selector: "[pkmnBorderCard]",
})
export class BorderCardDirective {
  private initialColor: string = "#f5f5f5";
  private defaultColor: string = "#EE82EE";
  private defaultHeight: number = 180;

  constructor(private el: ElementRef) {
    this.setHeight(this.defaultHeight);
    this.setBorder("#f5f5f5");
  }

  @Input("pkmnBorderCard") borderColor: string;

  @HostListener("mouseenter") onMouseEnter() {
    this.setBorder(this.borderColor || this.defaultColor);
  }
  @HostListener("mouseleave") onMouseLeave() {
    this.setBorder(this.initialColor);
  }
  setHeight(height: number) {
    this.el.nativeElement.style.height = `${height}px`;
  }

  setBorder(color: string) {
    this.el.nativeElement.style.border = `solid 4px ${color}`;
  }
}
