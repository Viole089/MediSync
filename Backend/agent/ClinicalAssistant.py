from langchain.prompts import PromptTemplate
from LlamaInstance import LlamaInstance
import time

class ClinicalAssistantAgent:
    def __init__(self):
        self.llm = LlamaInstance()
        self.usage_count = 0
        self.last_break_time = time.time()

    def _check_burnout_prevention(self):
        """Suggest breaks if excessive usage is detected."""
        self.usage_count += 1
        current_time = time.time()

        if self.usage_count % 5 == 0:
            print("\n[System]  Pensez à faire une courte pause après", self.usage_count, "requêtes.")

        if current_time - self.last_break_time > 3600:
            print("\n[System] Rappel horaire : Prenez 5 minutes pour vous ressourcer !")
            self.last_break_time = current_time

    def describe_medical_history(self, medical_history: dict) -> str:
        self._check_burnout_prevention()
        if not medical_history:
            return None

        template = PromptTemplate(
            input_variables=["history"],
            template="""
            Résumez cet historique médical en français (<250 mots) en utilisant 'Il' :
            {history}

            Puis ajoutez :
            1. **Observation de résilience** (ex: "Malgré [condition], il montre [adaptation positive]")
            2. **Note d'appréciation pour le clinicien** (ex: "Observer [défi] démontre votre attention au détail")

            Structure :
            [Résumé]...
            [Résilience]...
            [Reconnaissance]...
            """
        )
        response = self.llm.invoke(template.format(history=medical_history))
        return response.content

    def recommend_instructions(self, medical_history: dict) -> str:
        self._check_burnout_prevention()
        situation = self.describe_medical_history(medical_history)
        if not situation:
            return None

        advise_template = PromptTemplate(
            input_variables=["situation"],
            template="""
            En tant que médecin senior compatissant, analysez ce cas :
            {situation}

            Fournissez en français :
            1. Recommandations cliniques (à puces)
            2. Message de soutien émotionnel à l'équipe de soins
            3. Citation motivationnelle sur la guérison

            Format :
            [Conseils médicaux]...
            [Soutien à l'équipe]...
            [Citation d'inspiration]...
            """
        )
        response = self.llm.invoke(advise_template.format(situation=situation))
        return response.content

    def emotional_check_in(self) -> str:
        """Proactive wellness check-in for clinicians."""
        emotional_checkin_prompt = """
        Générer un message de bienveillance pour un clinicien qui :
        1. Valide le stress (ex: "Ce travail peut être accablant lorsque...")
        2. Offre une stratégie concrète d'adaptation (ex: "Essayez la méthode STOP : Stop, Respirez, Observez, Poursuivez")
        3. Termine sur une note d'espoir (ex: "Votre persévérance sauve des vies chaque jour")

        Utilisez des métaphores médicales. Limitez à 3 lignes.
        """
        response = self.llm.invoke(emotional_checkin_prompt)
        return response.content

    def break_reminder(self) -> str:
        """Gentle reminder after intense work sessions."""
        break_reminder_prompt = """
        Vous êtes un assistant médical attentionné. Générez un rappel bref et positif pour un soignant travaillant intensément :
        
        Incluez :
        1. Reconnaissance de son effort (ex: "Je vois que vous avez étudié de nombreux cas aujourd'hui")
        2. Suggestion de micro-pause (ex: "Essayez d'étirer vos épaules 15 secondes")
        3. Fait scientifique : Les pauses augmentent la précision des diagnostics.

        Gardez sous 2 phrases. Parlez comme un collègue bienveillant.
        """
        response = self.llm.invoke(break_reminder_prompt)
        return response.content

if __name__ == "__main__":
    agent = ClinicalAssistantAgent()
    dummy_history = {"symptoms": "fièvre persistante", "treatment": "paracétamol", "background": "antécédent de diabète"}

    print(agent.describe_medical_history(dummy_history))
    print(agent.recommend_instructions(dummy_history))
    print(agent.emotional_check_in())
    print(agent.break_reminder())
