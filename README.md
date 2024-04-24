# JunBot
Tekoäly pseudosimulaatio botti demoamaan tekoälyn toimintaa turvallisesti

Voit käyttää JunBottia github pagesissa https://aaltojunior.github.io/JunBot/

## index.html
Sisältää itse junbotin sivun (sekä css muotoilun)

## script.js
Sisältää toiminnan ja koodin. ideana on tallentaa keskustelu json muodossa skenaario kansioon.
Script hakee halutun skenaarion ja lataa sen clientille.
Sivuston painikkeiden avulla skenaariosta luetaan junbotin viestejä sekä niille määritettyjä vastausvaihtoehtoja

## Pseudosimulaatio
Sivusto näyttää ja tuntuu keskustelulta. Viestien sanamuodot jäljittelevät keskustelua tekoälyn kanssa kuten microsoftin Copilot.
Sivuston käyttökokemus pyrkii luomaan uskottavan illuusion siitä miten keskustelu tekoälyn kanssa voisi kulkea.
Valmiiksi kirjoitettu keskustelu varmistaa ettei sisällö ole käyttäjille haitallista. Sivusto ei myöskään tallenna käyttäjästään mitään muita tietoja kuin github pagesin omat kävijämäärä mittaukset.
