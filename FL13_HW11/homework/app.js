const data = [
  {
    'folder': true,
    'title': 'Pictures',
    'children': [
      {
        'title': 'logo.png'
      },
      {
        'folder': true,
        'title': 'Vacations',
        'children': [
          {
            'title': 'spain.jpeg'
          }
        ]
      }
    ]
  },
  {
    'folder': true,
    'title': 'Desktop',
    'children': [
      {
        'folder': true,
        'title': 'screenshots',
        'children': null
      }
    ]
  },
  {
    'folder': true,
    'title': 'Downloads',
    'children': [
      {
        'folder': true,
        'title': 'JS',
        'children': null
      },
      {
        'title': 'nvm-setup.exe'
      },
      {
        'title': 'node.exe'
      }
    ]
  },
  {
    'title': 'credentials.txt'
  }
];
const ROOT_NODE = document.getElementById('root');
const FOLDER_ICON = '<span class="material-icons folderIcon">folder</span>';
const OPENED_FOLDER_ICON = '<span class="material-icons folderIcon">folder_open</span>';
const FILE_ICON = '<span class="material-icons fileIcon">insert_drive_file</span>';
const NODES_COUNT = 2;

ROOT_NODE.addEventListener('click', hideShowElements);
ROOT_NODE.addEventListener('click', changeFolderView);
ROOT_NODE.addEventListener('contextmenu', showContextMenu);
ROOT_NODE.addEventListener('click', hideContextMenu);

document.addEventListener('DOMContentLoaded', () => {
  buildTree(data, ROOT_NODE);
  showfirstDepthNodes();
  addClassToFirstDepthNodes();
  createContextMenu();
});

function buildTree(data, renderNode){
  let mainWrap = document.createElement('ul');
  mainWrap.classList.add('hidden');
  for(let item of data) {
      let headerNode = document.createElement('li');
      if ( item.folder ) {
        headerNode.innerHTML = FOLDER_ICON + item.title;
        headerNode.classList.add('folder');
        if ( item.children ) {
          buildTree(item.children, headerNode);
        } else {
          let emptyFolderNode = document.createElement('li');
          emptyFolderNode.classList.add('empty-folder-node', 'hidden');
          emptyFolderNode.innerHTML = 'Folder is empty';
          headerNode.innerHTML += emptyFolderNode.outerHTML;
        }
      } else {
        headerNode.innerHTML = FILE_ICON + item.title;
      }
      mainWrap.innerHTML += headerNode.outerHTML;
  }
  renderNode.appendChild(mainWrap);
}

function createContextMenu() {
  let menuWrapper = document.createElement('ul');
  let renameItem = document.createElement('li');
  let deleteItem = document.createElement('li');
  menuWrapper.classList.add('context-menu');
  deleteItem.classList.add('context-menu-item', 'remove');
  renameItem.classList.add('context-menu-item', 'rename');
  renameItem.innerText = 'Rename';
  deleteItem.innerText = 'Delete item';
  menuWrapper.innerHTML = renameItem.outerHTML + deleteItem.outerHTML;
  ROOT_NODE.appendChild(menuWrapper);
}

function showContextMenu(event) {
  event.preventDefault();
  const MENU = document.querySelector('.context-menu');
  let target = event.target;
  let emptyFolder = target.classList.contains('empty-folder-node');
  if ( !emptyFolder ) {
    MENU.classList.add('active');
    MENU.style.top = `${event.clientY}px`;
    MENU.style.left = `${event.clientX}px`;
  }
  addMenuEvents(target);
}

function hideContextMenu() {
  const MENU = document.querySelector('.context-menu');
  MENU.classList.remove('active');
}

function addMenuEvents(target) {
  const REMOVE_ITEM = document.querySelector('.remove');
  const RENAME_ITEM = document.querySelector('.rename');
  const IS_TARGET_TREE_ITEM = target.nodeName === 'LI';
  const IS_TARGET_ICON = target.nodeName === 'SPAN'; 
  if ( IS_TARGET_TREE_ITEM || IS_TARGET_ICON ) {
    REMOVE_ITEM.style.color = 'rgb(0,0,0)';
    RENAME_ITEM.style.color = 'rgb(0,0,0)';
    REMOVE_ITEM.addEventListener('click', removeEvent);
    // RENAME_ITEM.addEventListener('click', renameEvent);
  } else {
    REMOVE_ITEM.style.color = 'rgb(180,180,180)';
    RENAME_ITEM.style.color = 'rgb(180,180,180)';
    REMOVE_ITEM.addEventListener('click', event => event.stopPropagation());
    RENAME_ITEM.addEventListener('click', event => event.stopPropagation());
  }

  function removeEvent() {
    const IS_TARGET_FOLDER = target.classList.contains('folder');
    const IS_TARGET_EMPTY_FOLDER = target.childNodes.length <= NODES_COUNT && IS_TARGET_FOLDER;
    // const IS_TARGET_FIRST_DEPTH_CHILD = target.classList.contains('first-depth-child');
    // const IS_TARGER_HAS_SIBLINGS = target.nextSibling || target.previousSibling;
      if ( !IS_TARGET_EMPTY_FOLDER ) {
        target.closest('li').remove();
      } else if ( IS_TARGET_EMPTY_FOLDER ) {
        if ( target.nextSibling ) {
          target.nextSibling.remove();
        }
        target.closest('li').remove();
      } else if ( IS_TARGET_ICON ) {
        target.closest('li').remove();
      } else {
        target.remove();
      }
  }
}

function hideShowElements(event) {
  const IS_TARGET_ICON = event.target.nodeName === 'SPAN';
  const TARGET = IS_TARGET_ICON ? event.target.closest('li') : event.target;
  let isTargetFolder = TARGET.classList.contains('folder');
  let isFolderNotEmpty = TARGET.childNodes.length > NODES_COUNT;
  if ( isTargetFolder && isFolderNotEmpty) {
     TARGET.lastChild.classList.toggle('hidden');
  } else if ( isTargetFolder && !isFolderNotEmpty ) {
     TARGET.nextSibling.classList.toggle('hidden');
  }
}

function changeFolderView(event) {
  const IS_TARGET_ICON = event.target.nodeName === 'SPAN';
  const TARGET = IS_TARGET_ICON ? event.target.closest('li') : event.target;
  let isTargetFolder = TARGET.classList.contains('folder');
  let isTargetClosed = TARGET.firstChild.innerText === 'folder';
    if ( isTargetFolder && isTargetClosed ) {
      TARGET.firstChild.innerText = 'folder_open'
    } else if ( isTargetFolder && !isTargetClosed ){
      TARGET.firstChild.innerText = 'folder'; 
    }
}

function showfirstDepthNodes() {
  ROOT_NODE.childNodes[0].classList.remove('hidden');
}

function addClassToFirstDepthNodes() {
  ROOT_NODE.childNodes[0].childNodes.forEach( elem => {
    elem.classList.add('first-depth-child');
  })
}
