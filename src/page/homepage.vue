<script>
import { ref } from 'vue'
import Button from '../../components/Button.vue'
import Hero3D from '../components/Hero3D.vue'

export default {
    components: {
        Button,
        Hero3D
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

        const solution = ref([
            {
                "icon": "/solution_icon/audio.svg",
                "title": "Assistant Vocal",
                "text": "Guidage à chaque étape",
                "alt": "icon d'assistant vocal pour l'aide à l'habillage"
            },
            {
                "icon": "/solution_icon/camera.svg",
                "title": "Reconnaissance des couleurs",
                "text": "Reconnaissance des couleurs annoncée à l'audio.",
                "alt": "icon de reconnaissance de couleur"
            },
        ])

        const cards = ref([
            {
                "background": "card_fonctionnality/color.svg",
                "title": "Reconnaissance des couleurs",
                "text": "Reflet identifie les vêtements grâce à une caméra intégrée et annonce leur couleur."
            },
            {
                "background": "card_fonctionnality/vocal.svg",
                "title": "Guidage vocal",
                "text": "Guidage audio clair et intuitif."
            },
            {
                "background": "card_fonctionnality/suggest.svg",
                "title": "Suggestion de tenues",
                "text": "Propositions adaptées à vos préférences."
            },
            {
                "background": "card_fonctionnality/detection.svg",
                "title": "Détection de vêtements",
                "text": "Classification automatique des habtis."
            },
            {
                "background": "card_fonctionnality/accessibility.svg",
                "title": "Accessibilité complète",
                "text": "Pensé pour être utilisé par tous."
            }
        ])

        const impact = ref([
            {
                "icon": "impact/controle.svg",
                "text": "Autonomie",
                "alt": "Redonner le contrôle du quotidien"
            },
            {
                "icon": "impact/inclusif.svg",
                "text": "Inclusion",
                "alt": "Unobjet pensé pour et avec tout le monde."
            },
            {
                "icon": "impact/innovation.svg",
                "text": "Innovation utile",
                "alt": "La technologie au service de l'humain."
            }
        ])

        return { problematique, solution, cards, impact }
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
            <Hero3D />
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
    <section id="solution">
        <div>
            <p>03</p>
            <h2>Notre solution : <br> Reflet.</h2>
            <p>Une armoire connectée qui identifie les vêtements, annonce les couleurs et propose des associations
                adaptées à vos envie. </p>
            <div style="display: flex; flex-direction: column;  gap: 10px; height: 20%;margin-top:10%;" class="bubble">
                <div v-for="(value, index) in solution" :key="index"
                    style="display: flex; flex-direction: row; align-items: center; gap: 10px;">
                    <img :src="value.icon" :alt="value.alt">
                    <div>
                        <h3>{{ value.title }}</h3>
                        <p style="font-size: 12px;">{{ value.text }}</p>
                    </div>
                </div>
            </div>
        </div>
        <div>
            <img src="/team.png" alt="image de notre équipe" id="team">
        </div>
    </section>
    <section id="fonctionnement">
        <p>04</p>
        <h2>Comment ça fonctionne ?</h2>
        <div>
            <div>
                <img src="/roadmap.svg" alt="image de notre équipe">
            </div>
        </div>
        <div>
            <div>
                <h3> Sélection</h3>
                <p> L'utilisateur choisit un vêtement.</p>
            </div>
            <div>
                <h3>Identification</h3>
                <p> L'armoire analyse la couleur et le type de vêtement.</p>
            </div>
            <div>
                <h3>Association</h3>
                <p> Reflet annonce la couleur et propose des associations</p>
            </div>
            <div>
                <h3>Rangement</h3>
                <p> L'utilisateur valide sa tenue en toute autonomie.</p>
            </div>
        </div>
    </section>
    <section id="fonctionnalité">
        <p>05</p>
        <h2>Fonctionnalités principales</h2>
        <div id="cards-container">
            <div v-for="(card, index) in cards" :key="index" class="card"
                :style="{ backgroundImage: `url(${card.background})` }">
                <h3>{{ card.title }}</h3>
                <p>{{ card.text }}</p>
            </div>
        </div>
    </section>
    <section id="démarche">
        <div class="text_démarche">
            <p>06</p>
            <h2>Un design pensé pour tous.</h2>
            <p>Chaque détail à été pensé pour offrir une experience simple, intuitive et accssible.</p>
            <Button variant="terciere" Text_value="Découvrir notre démarche" />
        </div>
        <div style="display: flex;width: 50%; gap: 20px;">
            <img src="/demarche_img/visage.png" alt="image de notre démarche"
                style="; height: auto; justify-self: flex-start; align-self: flex-start;">
            <img src="/demarche_img/armoire.png" alt="image de l'armoire"
                style=" height: auto; justify-self: flex-end; align-self: flex-end;">
        </div>
    </section>
    <section id="video-section">
        <div class="video-content">
            <div class="text_démarche">
                <p>07</p>
                <h2>Voir Reflet en action</h2>
                <p>Découvrez le prototype et imaginez un quotidien plus autonome.</p>
                <Button variant="primary" Text_value="Voir la vidéo" />
            </div>
            <div class="video-container">
                <iframe width="100%" height="50%" src="https://www.youtube.com/embed/VIDEO_ID"
                    title="YouTube video player" frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen></iframe>
            </div>
        </div>
    </section>
    <section id="problematique">
        <div>
            <p style="align-self:flex-start;">08</p>
            <h2>un impact positif au quotidien</h2>
            <p>Reflet c'est bien plus qu'une armoire : c'est un pas vers plus d'indépendance, de confiance et de
                liberté.</p>
        </div>
        <div v-for="(value, index) in impact" :key="index" class="bubble">
            <img :src="value.icon" :alt="value.alt">
            <h3>{{ value.text }}</h3>
            <p>{{ value.alt }}</p>
        </div>
    </section>
</template>


<style scoped>
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


#impact {
    background-color: var(--secondary-color);
    color: var(--white);

}

#démarche .text_démarche {
    color: var(--white);
}

.text_démarche {
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 40%;
}

#démarche {
    background-color: var(--primary-color);
    display: flex;
    flex-direction: row !important;
}

#démarche div img {
    width: 60%;
    height: auto;
}


#fonctionnalité h2 {
    color: var(--primary-color);
}

#fonctionnalité p {
    width: fit-content;
}

#fonctionnement div div img {
    width: 95%;
    height: auto;
}

#fonctionnement div div {
    width: 100%;
    height: 100%;
}

#fonctionnement div {
    justify-self: center;
    display: flex;
    flex-direction: row;
    gap: 20%;
    width: 100%;
    margin-top: 20px;
}

#fonctionnement h2 {
    margin-bottom: 50px;
    padding: 0;
}

#fonctionnement div p {
    width: 150%;
    text-align: center;
}

#fonctionnement div div {
    display: flex;
    flex-direction: column;
    align-items: center;

}

#fonctionnement div div h3 {
    margin: 5px;
    padding: 0;
}

.bubble p {
    margin: 0;
    padding: 0;
    font-size: 14px;
    color: var(--grey-light);
}


#problematique .bubble img {
    width: 150px;
    margin-bottom: 10px;
}

#problematique .bubble {

    text-align: center;

}

#fonctionnement {
    background-color: var(--secondary-color);
    color: var(--white);
}

.bubble {

    opacity: 0;
    animation: bubbleAppear 1s ease-out forwards;
}

#solution div #team {
    align-self: flex-start;
    margin-top: 30%;
    margin-left: 10%;
    height: 70%;
}

#solution div div div {
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: center;
    align-items: flex-start;
}

#solution div div img {
    height: 70px;
    margin-bottom: 10px;
    margin-right: 20px;

}

#solution div div div h3 {
    margin: 5px;
    padding: 0;
}

#solution div div div p {
    margin: 5px;
    padding: 0;
}

#solution div div p {
    width: 100%;
}

#solution div div {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    min-width: 20vw;
    gap: 10px;
    align-items: center;
    width: fit-content;
}

#solution div p {
    width: 60%;
}

#solution div {
    width: 40%;
    height: 80vh;
    display: flex;
    flex-direction: column;
    gap: 10px;
}

#solution {
    background-color: var(--primary-color);
    color: white;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: center;
    height: fit-content;
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

section {
    padding: 5% 10%;
}

#problematique {
    color: var(--white);
    background-color: var(--secondary-color);
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    gap: 9%;
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
    color: var(--primary-color) !important;
    display: flex;
    flex-direction: row;
    width: 80%;
    height: 90vh;
}

#presentation div {
    width: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;
}

#presentation p {
    padding-right: 30%;
}

h1 {
    font-size: var(--h1-size);
}

#fonctionnalité {
    display: flex;
    flex-direction: column;
    width: 80% !important;
}

#fonctionnalité h2 {
    width: fit-content;
}

#cards-container {
    display: flex;
    flex-direction: row;
    gap: 20px;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: wrap;
    margin-top: 30px;
    width: 100%;
}

.card {
    background-repeat: no-repeat;
    background-position: flex-start;
    background-size: cover;
    width: 18%;
    aspect-ratio: 0.77;
    border-radius: 30px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: 20px;
    color: white;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    box-sizing: border-box;
}

.card:hover {
    transform: translateY(-8px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
}

.card h3 {
    margin: 0 0 10px 0;
    font-size: 18px;
    font-weight: 600;
}

.card p {
    margin: 0;
    font-size: 14px;
    line-height: 1.4;
}

#video-section {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 5% 10%;
    gap: 50px;
}

.video-content {
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
    gap: 50px;
}

.video-container {
    margin-left: 200px;
    width: 50%;
    aspect-ratio: 16 / 9;
    background-color: #d3d3d3;
    border-radius: 20px;
    overflow: hidden;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.video-container iframe {
    width: 100%;
    height: 100%;
}

#video-section .text_démarche {
    width: 40%;
    color: var(--primary-color);
}

#video-section .text_démarche p:first-child {
    font-size: 16px;
    font-weight: 600;
    color: var(--primary-color);
    margin: 0 0 10px 0;
}

#video-section .text_démarche h2 {
    color: var(--primary-color);
    margin: 10px 0 20px 0;
}

#video-section .text_démarche p {
    color: var(--grey-dark);
    line-height: 1.6;
    margin-bottom: 20px;
}
</style>