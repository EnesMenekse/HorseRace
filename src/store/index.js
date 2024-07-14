import { createStore } from "vuex";

const MAX_POSITION = 95;
const LAP_COUNT = 6;

export default createStore({
  state: {
    horseList: [
      { name: "Aurora", condition: 93, color: "Gold" },
      { name: "Blizzard", condition: 89, color: "Pearl" },
      { name: "Titan", condition: 88, color: "Ivory" },
      { name: "Cyclone", condition: 85, color: "Mahogany" },
      { name: "Blaze", condition: 83, color: "Tawny" },
      { name: "Vega", condition: 82, color: "Sunset" },
      { name: "Tornado", condition: 80, color: "Ebony" },
      { name: "Twilight", condition: 79, color: "Crimson" },
      { name: "Breeze", condition: 77, color: "Sand" },
      { name: "Eclipse", condition: 75, color: "Sterling" },
      { name: "Canyon", condition: 74, color: "Spotted" },
      { name: "Helios", condition: 72, color: "Amber" },
      { name: "Spirit", condition: 70, color: "Midnight" },
      { name: "Mist", condition: 68, color: "Golden" },
      { name: "Zelda", condition: 65, color: "Slate" },
      { name: "Shadow", condition: 63, color: "Silver" },
      { name: "Echo", condition: 61, color: "Snow" },
      { name: "Raven", condition: 58, color: "Cerulean" },
      { name: "Griffin", condition: 52, color: "Bronze" },
      { name: "Starlight", condition: 49, color: "Jet" },
    ],
    raceList: [],
    resultList: Array.from({ length: LAP_COUNT }, () => []),
    lap: 0,
    isRacePaused: true,
  },
  mutations: {
    setRaceList(state, list) {
      state.raceList = list;
    },
    setLap(state, lap) {
      state.lap = lap;
    },
    clearResultList(state) {
      state.resultList = Array.from({ length: LAP_COUNT }, () => []);
    },
    updateResultList(state, { lane, name }) {
      state.resultList[state.lap - 1].push({ lane, name });
    },
    togglePause(state) {
      state.isRacePaused = !state.isRacePaused;
    },
    updateHorsePosition(state, name) {
      const horse = state.raceList.find((horse) => horse.name === name);

      if (horse) {
        horse.position += horse.condition * Math.random() * 0.02;

        if (horse.position > MAX_POSITION) horse.position = MAX_POSITION;
      }
    },
    resetHorsePositions(state) {
      state.raceList.forEach((horse) => (horse.position = 0));
    },
  },
  getters: {
    getRaceHorseByName: (state) => (name) => {
      return state.raceList.find((horse) => horse.name === name);
    },
  },
  actions: {
    createRaceList({ state, commit }) {
      if (!state.isRacePaused) commit("togglePause");
      commit("setLap", 1);
      commit("setRaceList", []);
      commit("clearResultList");

      const shuffledHorseList = [...state.horseList].sort(
        () => 0.5 - Math.random()
      );
      const raceList = shuffledHorseList
        .slice(0, 10)
        .map((horse, index) => ({ ...horse, lane: index + 1, position: 0 }));

      commit("setRaceList", raceList);
    },
    toggleRace({ state, commit, dispatch }) {
      if (state.raceList.length > 0) {
        commit("togglePause");

        if (!state.isRacePaused) dispatch("animateRace");
      }
    },
    animateRace({ state, commit, dispatch, getters }) {
      const interval = setInterval(() => {
        if (state.isRacePaused) clearInterval(interval);
        let allHorsesFinished = true;

        state.raceList.forEach(({ position, name, lane }) => {
          if (position < MAX_POSITION) {
            allHorsesFinished = false;

            commit("updateHorsePosition", name);

            const { position } = getters.getRaceHorseByName(name);

            if (position === MAX_POSITION) {
              commit("updateResultList", { lane, name });
            }
          }
        });

        if (allHorsesFinished) {
          clearInterval(interval);

          if (state.lap < LAP_COUNT && !state.isRacePaused) {
            commit("setLap", state.lap + 1);
            commit("resetHorsePositions");
            dispatch("animateRace");
          }
        }
      }, 50);
    },
  },
  modules: {},
});
