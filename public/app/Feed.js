var edits = document.querySelector('.edits');
var firstElement = document.querySelector('.edit:nth-child(1)');

var button = document.querySelector('button');
button.addEventListener('click', function (event) {
    
    var edit = createedit('Contenu_du_Fichier');
    
    var size = getDimensions(edits, edit);
    
    var styleTag = createAnimation(size.height);
        
    edit.style['animation'] = styleTag.getAttribute('data-animationName') + ' 0.75s';
    edit.style['-webkit-animation'] = styleTag.getAttribute('data-animationName') + ' 0.75s';
    
    // On "nettoie" le CSS pour que l'animation puisse être appelée via une classe, un identifiant ou un type
    edit.addEventListener('animationend', function cleanup(event) {
        this.style.animation = '';
    });
    
    edit.addEventListener('webkitAnimationEnd', function cleanupWebkit(event) {
        this.style['-webkit-animation'];
    });
    
    edits.insertBefore(edit, firstElement.nextSibling);
});

function createEdit(label) {
    var edit = document.createElement('li');
    edit.innerHTML = label;
    edit.classList.add('edit');
    return edit;
}

function cloneContainer(container) {
    
    var clone = container.cloneNode();
    clone.classList.add('clone');
    clone.style.width = container.clientWidth;
    clone.style.height = container.clientHeight;
    return clone;
}

function getDimensions(container, element) {
    
    // On créé un clone de l'élément
    var containerClone = cloneContainer(container);
    document.body.appendChild(containerClone);
    
    // On insert le "clone"
    containerClone.appendChild(element);
        
    var measure =  {
        width: element.offsetWidth,
        height: element.offsetHeight
    };
    
    // On supprime le "clone"
    document.body.removeChild(containerClone);
    
    return measure;
}

// GENERATION ANIMATION
var animationId = 0;

var template = document.querySelector('[type^=application]').textContent;
function createAnimation(height) {
    
    var animationName = 'addedit-'+ (++animationId);
    
    var styleTag = document.createElement('style');
    styleTag.setAttribute('data-animationName',animationName);
    styleTag.textContent = template.replace(/\{\{height\}\}/g, height).replace(/\{\{animationId\}\}/g, animationName);
    document.head.appendChild(styleTag);
    return styleTag;
}

// On supprimer l'animation une fois celle-ci terminée
document.body.addEventListener('animationend', function removeAnimation(animationendEvent) {
    var animationStyleTag = document.querySelector('style[data-animationname=' + animationendEvent.animationName + ']');
    document.head.removeChild(animationStyleTag);
});