<template>
    <section id="hero-perso">
        <h1 id="top">Une personnalisation,<br>un point d'importance dans l'aide</h1>
        <p>Rentrer vos préférences dans ce guide pour adapter vos tenues à votre style et à vos goûts.</p>
    </section>

    <ColorPreferences @update:colors="handleColors" />
    <div id="bg"
        style="display: flex; flex-direction: column; justify-content: flex-start; align-items: flex-start; padding: 2% 0%;">
        <section>
            <h2>Choix des tenues</h2>

            <postitSelector />
        </section>
        <section>
            <h2>Style vestimentaire qu'il ou elle préfère porter au quotidien</h2>
            <h3>Quelle type de contexte serait le plus probable d’être habillé</h3>
            <p>Choisir le ou les style/s qui lui corresponde:</p>
            <chooseStyle @update:selection="handleStyleSelection" />
        </section>
        <Button text="Recevoir le prototype" style="align-self: center; border-radius: 40px; margin-top: 100px;" />
    </div>
</template>

<script setup>
import ColorPreferences from '../components/ColorPreferences.vue'
import postitSelector from '../components/postit_selector.vue'
import chooseStyle from '../components/choose_style.vue'
import Button from '../components/Button.vue'

function handleColors(colors) {
    console.log('Couleurs choisies :', colors)
}

import { onMounted } from 'vue'


onMounted(async () => {
    window.scrollTo(0, 0)
})
</script>

<style scoped>
h1 {
    font-size: var(--h1-size);
    margin-bottom: 20px;
    font-family: "Syne-B";
    color: var(--primary-color);
}

p {
    font-size: var(--text-size);
    margin-bottom: 20px;
    font-family: "Syne-R";
    color: var(--secondary-color);
}

h3 {
    font-size: var(--h3-size);
    margin-bottom: 20px;
    font-family: "Syne-B";
    color: var(--primary-color);
}

h2 {
    font-size: var(--h2-size);
    margin-bottom: 20px;
    font-family: "Syne-B";
}

#bg {
    background-image: url('/bg_pres_perso.svg');
    background-size: cover;
    background-position: center;
    padding: 5% 10%;
}

section {
    padding: 5% 10%;
    padding-bottom: 10px;
}

#hero-perso {
    padding: 8% 10%;
    color: var(--primary-color);
    background-image: url('/bg_pres_perso.svg');
    background-size: cover;
    background-position: center;
}

#hero-perso h2 {
    font-size: var(--h2-size);
    max-width: 60%;
    margin-bottom: 20px;
}

#hero-perso p {
    font-size: 14px;
    max-width: 40%;
    color: var(--grey-dark);
}
</style>