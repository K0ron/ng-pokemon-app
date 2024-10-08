import { Component } from "@angular/core";
import { Pokemon } from "../pokemon";
import { Router } from "@angular/router";
import { debounceTime, distinctUntilChanged, Observable, Subject, switchMap } from "rxjs";
import { PokemonService } from "../pokemon.service";

@Component({
  selector: "app-search-pokemon",
  templateUrl: "./search-pokemon.component.html",
  styles: [],
})
export class SearchPokemonComponent {
  searchTerms = new Subject<string>();

  pokemos$: Observable<Pokemon[]>;

  constructor(private router: Router, private pokemonService: PokemonService) {}

  ngOnInit(): void {
    this.pokemos$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term) => this.pokemonService.searchPokemonList(term))
    );
  }

  search(term: string) {
    this.searchTerms.next(term);
  }

  goToDetail(pokemon: Pokemon) {
    const link = ["/pokemon", pokemon.id];
    this.router.navigate(link);
  }
}
