<script>
import { ref } from 'vue'
import Button from '../../components/Button.vue'

export default {
    components: {
        Button
    },
    setup() {
        const problematique = ref([
            {
                "icon": "icon_issues/finding_color.svg",
                "text": " Difficulté à reconnaitre les couleurs.",
                "alt": "icon du manque de vision pour les couleurs"
            },
            {
                "icon": "icon_issues/dependence.svg",
                "text": "Dépendance à un proche",
                "alt": "icon pour la dépendance au proche"
            },
            {
                "icon": "icon_issues/time.svg",
                "text": "Perte de temps et d'autonomie",
                "alt": "icon d'indication de perte de temp pour s'habiller"
            }
        ])

        return { problematique }
    }
}
</script>
<template>
    <section id="presentation">
        <div>
            <h1>Une armoire connectée pensée pour les personnes aveugle</h1>
            <p>Reflet accompagne chaque matin vers plus d'autonomie grâce à la technologie,à l'audio et à un design
                inclusif.</p>
            <div>
                <Button variant="primary" Text_value="Découvrir le prototype" />
                <Button variant="secondary" Text_value="Voir la vidéo" />
            </div>
        </div>
        <div>
            <canvas>

            </canvas>
        </div>
    </section>
    <section id="problematique">
        <div>
            <p style="align-self:flex-start;">02</p>
            <h2>Le quotidien peut être compliqué.</h2>
            <p>choisir une tennue, reconnaître les couleurs, associer les vêtement... Autant de défis qui prennent du
                temps et créent souvent de la dépendance.</p>
        </div>
        <div v-for="(value, index) in problematique" :key="index" class="bubble">
            <img :src="value.icon" :alt="value.alt">
            <p>{{ value.text }}</p>
        </div>
    </section>
    <section>
        <div>
            <h2>Notre solution : <br> Reflet.</h2>
            <p>Reflet accompagne chaque matin vers plus d'autonomie grâce à la technologie,à l'audio et à un design
                inclusif.</p>

        </div>
        <div>
            <canvas>

            </canvas>
        </div>
    </section>
</template>


<style>
@keyframes bubbleAppear {
    from {
        opacity: 0;
        transform: translateY(20px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

h2 {
    font-size: var(--h2-size);
    margin: 5px 0px;
}

#presentation div div {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    width: 100%;
}

#problematique {
    background-color: var(--orange);
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    width: 100%;
    padding: 30px 0%;
}

#problematique img {
    height: 50%;
}

#problematique div {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    max-width: 30%;
}

#problematique div.bubble {
    animation: bubbleAppear 1s ease-out forwards;
}

#problematique div.bubble:nth-child(2) {
    animation-delay: 0.3s;
}

#problematique div.bubble:nth-child(3) {
    animation-delay: 0.6s;
}

#problematique div.bubble:nth-child(4) {
    animation-delay: 0.9s;
}


#presentation {
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 90vh;
}

#presentation div {
    width: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;
    padding: 5%;
}

#presentation p {
    padding-right: 30%;
}

h1 {
    font-size: var(--h1-size);
    color: var(--black);
}
</style>