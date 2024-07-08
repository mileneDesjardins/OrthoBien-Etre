import React, { useContext, useEffect, useState } from "react";
import { Button, Card, Container, Stack } from "react-bootstrap";
import { AxiosContext } from "..";
import ModelePage from "../layout/ModelePage";

function PageFAQ() {
  const faqItems = [
    {
      question:
        " Les semelles orthopédiques peuvent-elles être utilisées dans n'importe quelle chaussure ?",
      answer:
        "En général, les semelles orthopédiques peuvent être utilisées dans la plupart des chaussures, mais leur compatibilité peut varier en fonction de l'épaisseur de la semelle de la chaussure. Il peut être nécessaire d'ajuster la taille ou de consulter un spécialiste pour les adapter à certains types de chaussures.",
    },
    {
      question:
        " Quelle est la différence entre une attelle et une orthèse pour le genou ?",
      answer:
        "Une attelle est généralement utilisée pour stabiliser une articulation ou un membre, souvent après une blessure, tandis qu'une orthèse est conçue pour corriger ou soutenir une partie spécifique du corps. Les orthèses pour le genou, par exemple, peuvent aider à soutenir et aligner correctement l'articulation.",
    },
    {
      question:
        " Comment choisir la bonne taille pour une ceinture lombaire ? ",
      answer:
        "Pour choisir la bonne taille de ceinture lombaire, mesurez votre tour de taille. Consultez ensuite le guide des tailles du fabricant pour déterminer la taille qui vous convient le mieux. Il est crucial que la ceinture soit ajustée mais pas trop serrée pour un soutien optimal.",
    },
    {
      question:
        " Les orthèses de poignet sont-elles efficaces pour le syndrome du canal carpien ? ",
      answer:
        "Oui, les orthèses de poignet sont souvent recommandées pour le syndrome du canal carpien. Elles aident à maintenir le poignet dans une position neutre, réduisant ainsi la pression sur le nerf médian, ce qui peut soulager les symptômes tels que la douleur et les engourdissements.",
    },
    {
      question:
        " Quel type de matériau est le mieux pour les semelles orthopédiques ?",
      answer:
        "Les semelles orthopédiques peuvent être faites de divers matériaux, mais souvent, ceux qui offrent un bon amorti et un soutien structurel sont préférés. Les matériaux comme le gel, le silicone, le cuir ou le plastique dur peuvent être utilisés en fonction des besoins individuels.",
    },
    {
      question: " Comment savoir si j'ai besoin d'une orthèse de cheville ?",
      answer:
        "Si vous ressentez une douleur persistante à la cheville, une instabilité ou si vous avez subi une blessure antérieure, une consultation avec un professionnel de la santé peut aider à déterminer si une orthèse de cheville serait bénéfique. Cela peut fournir un soutien et une stabilisation supplémentaires. ",
    },
    {
      question:
        " Quel type d'oreiller cervical est recommandé pour les problèmes de cou ? ",
      answer:
        "Les oreillers cervicaux qui offrent un soutien ferme mais confortable à la courbe naturelle du cou sont souvent recommandés. Les oreillers en mousse à mémoire de forme ou en latex peuvent être bénéfiques en offrant un bon maintien et en soulageant la pression sur le cou.",
    },
    {
      question: " Comment entretenir une attelle de cheville ? ",
      answer:
        "En général, il est recommandé de nettoyer régulièrement l'attelle de cheville en suivant les instructions du fabricant. Utilisez un chiffon humide avec un savon doux pour enlever la saleté et l'humidité, et assurez-vous de laisser l'attelle sécher complètement avant de la réutiliser. ",
    },
    {
      question:
        " Les semelles orthopédiques peuvent-elles être utilisées dans n'importe quelle chaussure ?",
      answer:
        "En général, les semelles orthopédiques peuvent être utilisées dans la plupart des chaussures, mais leur compatibilité peut varier en fonction de l'épaisseur de la semelle de la chaussure. Il peut être nécessaire d'ajuster la taille ou de consulter un spécialiste pour les adapter à certains types de chaussures.",
    },
    {
      question:
        " Comment choisir une attelle pour une entorse de la cheville ?",
      answer:
        "Pour choisir une attelle pour une entorse de la cheville, il est important de considérer le niveau de soutien nécessaire et le type d'entorse. Les entorses légères peuvent nécessiter une attelle souple pour permettre une certaine mobilité, tandis que les entorses plus graves pourraient nécessiter une attelle rigide pour limiter le mouvement et favoriser la guérison.",
    },
    {
      question:
        " Est-ce que les orthèses plantaires peuvent corriger les problèmes de pieds plats ? ",
      answer:
        " Les orthèses plantaires peuvent aider à soulager les symptômes associés aux pieds plats, tels que la douleur et la fatigue. Elles ne corrigent pas nécessairement la structure du pied, mais offrent un soutien supplémentaire pour réduire l'inconfort en redistribuant la pression sur le pied.",
    },
    {
      question:
        " Les attelles de poignet sont-elles adaptées pour le syndrome du canal carpien pendant la nuit ?",
      answer:
        "Oui, les attelles de poignet sont souvent recommandées pour être portées pendant la nuit en cas de syndrome du canal carpien. Elles peuvent aider à maintenir le poignet dans une position neutre, réduisant ainsi la pression sur le nerf médian pendant le sommeil, ce qui peut contribuer à diminuer les symptômes tels que la douleur et l'engourdissement.",
    },
    {
      question: " Comment puis-je retourner un produit ? ",
      answer:
        "Vous pouvez nous contacter soit par e-mail en précisant votre numéro de commande et les détails du produit à retourner ainsi que la raison de retour, ou bien en appelant notre service clientèle pendant nos heures d'ouverture. Nous serons ravis de vous aider à initier le processus de retour et à vous guider à travers les étapes nécessaires.",
    },
    //ajouter des questions ici
  ];

  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleAnswer = (index) => {
    if (expandedIndex === index) {
      setExpandedIndex(null);
    } else {
      setExpandedIndex(index);
    }
  };

  return (
    <ModelePage>
      <Stack gap={3}>
        <Container className="text-center">
          <h1>FAQ</h1>
          {faqItems.map((item, index) => (
            <Card key={index}>
              <Card.Header>
                <Button
                  variant="link"
                  onClick={() => toggleAnswer(index)}
                  aria-controls={`faq-${index}`}
                  aria-expanded={expandedIndex === index}
                >
                  {item.question}
                </Button>
              </Card.Header>
              {expandedIndex === index && (
                <Card.Body id={`faq-${index}`}>{item.answer}</Card.Body>
              )}
            </Card>
          ))}
        </Container>
      </Stack>
    </ModelePage>
  );
}

export default PageFAQ;
