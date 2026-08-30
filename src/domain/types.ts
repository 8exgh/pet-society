export type PetDesign = { name:string; species:'cat'|'dog'|'bunny'|'bear'; body:string; ears:string; eyes:string; muzzle:string; pattern:string; patternColor:string; accessory:string };
export type Item = { id:string; name:string; category:'food'|'clothes'|'furniture'|'garden'|'toy'; price:number; icon:string; level:number };
export type GameState = {
  userId:string; email:string; pet:PetDesign|null; coins:number; gems:number; pawPoints:number; level:number;
  hunger:number; hygiene:number; happiness:number; energy:number; streak:number; lastDaily:string|null;
  inventory:Record<string,number>; equipped:string[]; roomItems:string[]; garden:Record<string,{plantedAt:number;readyAt:number}>;
  fish:string[]; recipes:string[]; treasures:string[]; trophies:string[]; quests:Record<string,number>; friends:string[];
  petling:null|{name:string;kind:string;bornAt:number;fed:number}; rooms:number; visits:number; giftsSent:number; racesWon:number;
};
export type GameEvent = { id:number; aggregate_id:string; event_type:string; event_data:string; timestamp:number; version:number };

export const ITEMS: Item[] = [
 {id:'apple',name:'Juicy Apple',category:'food',price:25,icon:'🍎',level:1},{id:'cupcake',name:'Cloud Cupcake',category:'food',price:60,icon:'🧁',level:2},
 {id:'soup',name:'Garden Soup',category:'food',price:90,icon:'🥣',level:4},{id:'bow',name:'Sunny Bow',category:'clothes',price:120,icon:'🎀',level:1},
 {id:'glasses',name:'Star Specs',category:'clothes',price:180,icon:'🤓',level:3},{id:'crown',name:'Tiny Crown',category:'clothes',price:550,icon:'👑',level:8},
 {id:'sofa',name:'Marshmallow Sofa',category:'furniture',price:280,icon:'🛋️',level:2},{id:'lamp',name:'Firefly Lamp',category:'furniture',price:160,icon:'💡',level:1},
 {id:'plant',name:'Happy Monstera',category:'furniture',price:140,icon:'🪴',level:2},{id:'sunflower',name:'Sunbeam Seeds',category:'garden',price:70,icon:'🌻',level:2},
 {id:'carrot',name:'Carrot Seeds',category:'garden',price:55,icon:'🥕',level:1},{id:'ball',name:'Bouncy Ball',category:'toy',price:80,icon:'⚽',level:1},
 {id:'frisbee',name:'Rainbow Disc',category:'toy',price:120,icon:'🥏',level:2},{id:'aquarium',name:'Bubble Aquarium',category:'furniture',price:420,icon:'🐠',level:5}
];

export function initialState(userId:string,email:string):GameState{return {userId,email,pet:null,coins:500,gems:5,pawPoints:0,level:1,hunger:80,hygiene:75,happiness:85,energy:90,streak:0,lastDaily:null,inventory:{apple:2,ball:1},equipped:[],roomItems:[],garden:{},fish:[],recipes:[],treasures:[],trophies:[],quests:{care:0,shop:0,play:0},friends:[],petling:null,rooms:1,visits:0,giftsSent:0,racesWon:0};}

export function replay(base:GameState,events:GameEvent[]):GameState{
 const s=structuredClone(base);
 for(const e of events){const d=JSON.parse(e.event_data); switch(e.event_type){
  case 'PetDesigned':s.pet=d;break; case 'CarePerformed':s[d.need as 'hunger'|'hygiene'|'happiness'|'energy']=Math.min(100,s[d.need as 'hunger']+d.amount);s.coins+=d.coins;s.pawPoints+=d.xp;s.quests.care++;break;
  case 'ItemPurchased':s.coins-=d.price;s.inventory[d.itemId]=(s.inventory[d.itemId]||0)+1;s.quests.shop++;break;
  case 'ItemUsed':s.inventory[d.itemId]--;if(d.need)s[d.need as 'hunger']=Math.min(100,s[d.need as 'hunger']+d.amount);break;
  case 'ItemEquipped':s.equipped=d.items;break;case 'RoomDecorated':s.roomItems=d.items;break;
  case 'DailyClaimed':s.coins+=d.coins;s.gems+=d.gems;s.streak=d.streak;s.lastDaily=d.day;break;
  case 'MiniGameCompleted':s.coins+=d.coins;s.pawPoints+=d.xp;s.quests.play++;if(d.game==='fishing'&&d.reward&&!s.fish.includes(d.reward))s.fish.push(d.reward);if(d.game==='treasure'&&d.reward&&!s.treasures.includes(d.reward))s.treasures.push(d.reward);if(d.game==='racing'&&d.won)s.racesWon++;break;
  case 'SeedPlanted':s.inventory[d.itemId]--;s.garden[d.plot]={plantedAt:e.timestamp,readyAt:d.readyAt};break;case 'PlantHarvested':delete s.garden[d.plot];s.coins+=d.coins;s.pawPoints+=d.xp;break;
  case 'PetlingAdopted':s.coins-=d.price;s.petling={name:d.name,kind:d.kind,bornAt:e.timestamp,fed:0};break;
  case 'FriendAdded':if(!s.friends.includes(d.friendId))s.friends.push(d.friendId);break;case 'FriendVisited':s.visits++;s.coins+=d.coins;s.pawPoints+=d.xp;break;
 }
 const level=Math.min(50,Math.floor(Math.sqrt(s.pawPoints/50))+1);if(level>s.level){s.level=level;s.rooms=Math.min(8,1+Math.floor(level/5));}
 }
 return s;
}
