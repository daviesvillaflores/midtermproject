function getRandomValue (min,  max){
  return Math.floor(Math.random()*(max-min))+min;
}

const app = Vue.createApp({
 data (){
  return {
   playerhealth:100,
   monsterhealth:100,
   currentRound:0,
   winner:null,
   logmessage:[],
  };
 },
 watch:{
  playerhealth(value){
   if(value <= 0 && this.monsterhealth <0){
     this.winner='draw';
   }else if(value <=0){
     this.winner='monster';
   }
  },
   monsterhealth(value) {
    if (value <= 0 && this.playerhealth < 0) {
      this.winner='lost';
    } else if (value <= 0) {
      this.winner='player';
    }
   },
 },
 computed:{
  monsterBarStyle(){
   if(this.monsterhealth < 0){
    return {width: '0%'};
   }
   return {width: this.monsterhealth + '%'};
  },
  playerBarStyle(){
   if(this.playerhealth < 0){
    return {width: '0%'};
   }
   return {width: this.playerhealth + '%'};
  },
  specialattack(){
   return this.currentRound % 3 !== 0;
  },
 },
 methods:{
  NewGame(){
   this.monsterhealth = 100;
   this.playerhealth = 100;
   this.winner = null;
   this.currentRound = 0;
   this.logmessage = [];
  },
  attackmonster(){
   this.currentRound++;
  const attackvalue=getRandomValue(5,10);
  this.monsterhealth -= attackvalue;
  this.Logmessage('player', 'attack', attackvalue);
  this.attackplayer();
  },
  attackplayer(){
    const attackvalue=getRandomValue(5,10);
    this.playerhealth -= attackvalue;
    this.Logmessage('monster', 'attack', attackvalue);
  },
  specialAttackmonster(){
   this.currentRound++;
  const attackvalue = getRandomValue(10,30);
   this.monsterhealth -= attackvalue;
   this.Logmessage('player', 'attack', attackvalue);
   this.attackplayer();
  },
  healPlayer(){
   this.currentRound++;
   const healvalue = getRandomValue(5,15)
   if(this.playerhealth + healvalue > 100){
    this.playerhealth = 100;
   }else{
   this.playerhealth += healvalue;
   }
   this.Logmessage('player', 'heal', healvalue);
   this.attackplayer();
  },
  surrender (){
   this.winner = 'monster';
  },
  Logmessage(who,what, value){
   this.logmessage.unshift({
    actionBy: who, 
    actionType: what,
    actionValue: value,
   });
  }
 },
 
});

app.mount('#game');