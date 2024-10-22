import React, { useState, useEffect } from "react";

const BackImages = ({ children }) => {
  // Liste des images (vous pouvez remplacer les chemins par les vôtres)
  const images = [
    "https://wallpapercave.com/wp/wp9780735.jpg",
    "https://wallpapercave.com/wp/wp5843017.jpg",
    "https://wallpapercave.com/wp/wp4137461.jpg",
    "https://wallpapercave.com/wp/wp6595195.jpg",
    "https://wallpapercave.com/wp/wp12596513.jpg",
    "https://wallpapercave.com/wp/wp12596517.jpg",
    "https://wallpapercave.com/wp/wp8960805.jpg",
    "https://wallpapercave.com/wp/wp3646106.jpg",
    "https://wallpapercave.com/wp/wp8384283.jpg",
    "https://wallpapercave.com/wp/wp8701346.jpg",
    "https://media.istockphoto.com/id/1575841882/photo/happy-playful-multiethnic-group-of-young-friends-bonding-outdoors.jpg?s=612x612&w=0&k=20&c=6EF_K7s-B6-FARpL5jHnV1z4xGXQ1SSzTIy0i4410E0=",
    "https://media.istockphoto.com/id/1427933927/photo/cheerful-young-friends-taking-selfie-portrait-in-summer-happy-people-looking-at-the-camera.jpg?s=612x612&w=0&k=20&c=bSUAXpkqVNv3GylLbxp3EnEPjdteYbewcsK4I3kJsE4=",
    "https://media.istockphoto.com/id/2148034049/photo/portrait-of-young-friends-sitting-on-ground-outdoors.jpg?s=612x612&w=0&k=20&c=oFj2bLUWdEhl167UWS3ErMhDwRbl87HoWGqGnHD7UDs=",
    "https://media.istockphoto.com/id/2154564412/photo/multiethnic-group-of-young-happy-friends-hanging-out.jpg?s=612x612&w=0&k=20&c=rY_g3YG6IjHEuQjUE2HMFS0j6p3zokt0kez6QdXuGuA=",
    "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fG1vZGV8ZW58MHx8MHx8fDA%3D",
    "https://images.unsplash.com/photo-1485231183945-fffde7cc051e?q=80&w=1587&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://media.gettyimages.com/id/1413308408/fr/photo/belle-femme-%C3%A9motive.jpg?s=612x612&w=0&k=20&c=oQdn85O8sgwy31j20LHqbCM63sZYMAAHWcKslS5loSU=",
    "https://media.gettyimages.com/id/1347455404/fr/photo/photo-dune-femme-m%C3%A9connaissable-passant-une-journ%C3%A9e-dans-la-ville.jpg?s=612x612&w=0&k=20&c=WErhzvcd-j9n_SFNyJACm6Ky5Q6anqjK1wLd5_DraJA=",
    "https://media.gettyimages.com/id/1386266678/fr/photo/beautiful-woman-in-front-of-plain-background.jpg?s=612x612&w=0&k=20&c=yuKnZjBd7fK8Q7M5xqAd_joxPr9K59Bpl10RzDLZ47s=",
    "https://media.gettyimages.com/id/495960336/fr/photo/mod%C3%A8le-au-d%C3%A9fil%C3%A9-de-mode.jpg?s=612x612&w=0&k=20&c=0eEnv6nC-bZvSQM_D2WuDp9wN1lkGgfvKIrvyvvPW38=",
    // Ajoutez plus d'images jusqu'à 20
  ];

  // État pour suivre l'image active
  const [currentIndex, setCurrentIndex] = useState(0);

  // Fonction pour changer d'image toutes les 10 secondes
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // 10 secondes

    // Nettoyer l'intervalle quand le composant se démonte
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className=" z-10 relative w-full h-screen overflow">
      {/* Affichage dynamique de l'image en arrière-plan */}
      {images.map((image, index) => (
        <img
          key={index}
          src={image}
          alt={`Mannequin ${index + 1}`}
          className={` absolute top-0 left-0 w-full h-full object-cover  transition-opacity duration-1000 ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
       {/* Rendre le contenu enfant par-dessus */}
      <div className="relative z-20">{children}</div>
    </div>
  );
};

export default BackImages;
