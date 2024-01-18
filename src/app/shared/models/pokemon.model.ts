export class Pokemon {

  id: number;
  name: string;
  sprite: string;
  spriteHome: string;
  type:string;

  constructor(id: number, name: string, sprite: string, spriteHome: string, type:string) {
    this.id = id;
    this.name = name;
    this.sprite = sprite;
    this.spriteHome = spriteHome;
    this.type = type;
  }

}
