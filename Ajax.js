import Grid from "./Grid.js";
import {structure} from "./structure.js";


let grid = new Grid('table', structure,'https://rickandmortyapi.com/api/character');
grid.redraw();