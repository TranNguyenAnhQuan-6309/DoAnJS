import { PipeTransform, Pipe } from "@angular/core";
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
@Pipe({ name: "highlight" })
export class HighlightPipe implements PipeTransform {
  constructor(public sanitizer: DomSanitizer) {}
  transform(text: string, search: string): SafeHtml {
    if (search && text) {
      let pattern = search.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
      pattern = pattern
        .split(" ")
        .filter((t: string | any[]) => {
          return t.length > 0;
        })
        .join("|");
      const regex = new RegExp(pattern, "gi");
      return this.sanitizer.bypassSecurityTrustHtml(
        text.replace(regex, match => `<span style='background-color:yellow'>${match}</span>`)
      );
    } else return text;
  }
}