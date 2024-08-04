import os
import threading
import webview
import requests
import json
from dateutil import parser
from datetime import *

from time import time


class Api:
    def fullscreen(self):
        webview.windows[0].toggle_fullscreen()

    def save_content(self, content):
        filename = webview.windows[0].create_file_dialog(webview.SAVE_DIALOG)
        if not filename:
            return

        with open(filename, 'w') as f:
            f.write(content)

    def ls(self):
        return os.listdir('.')
    

    def return_card_info(self):
        base_directory = os.getcwd()
        f = open(f'{base_directory}/YGOProDeck_Card_Info.json')
        f2 = open(f'{base_directory}/Set_Chronology.json')
        data = json.load(f)
        data2 = json.load(f2)

        card_info = {}
        for card_info_data in data['data']:
            card_info[card_info_data['name']] = card_info_data
        yugikaiba = date(2002, 3, 29)

        cards = []
        for card in data2:
            for set in data2[card]:
                try:
                    date_ = parser.parse(data2[card][set]['set_chronology_tcg'][1]).date()
                    if date_ <= yugikaiba and card not in cards:
                        attribute = 'None'
                        level = 0
                        atk = 0
                        defn = 0
                        try:
                            attribute = card_info[card]['attribute']
                            level = card_info[card]['level']
                            atk = card_info[card]['atk']
                            defn = card_info[card]['def']
                            card_info = {"card_type": card_info[card]['type'],
                                               "card_attribute": attribute,
                                               "card_race": card_info[card]['race'],
                                               "card_level": str(level),
                                        "card_attack": str(atk),
                                        "card_defense": str(defn),
                                        "card_image": card_info[card]['card_images'][0]['image_url_cropped']
                                        }
                            
                            cards.append(card_info)
                        except:
                            card_info = {"card_type": card_info[card]['type'],
                                               "card_race": card_info[card]['race'],
                                               "card_level": str(level),
                                        "card_attack": str(atk),
                                        "card_defense": str(defn),
                                        "card_id": card_info[card].get('id', ''),
                                        "card_image": card_info[card]['card_images'][0]['image_url_cropped']
                                        }
                            cards.append(card_info)
                except Exception as e:
                    print(e)
        return cards    


def get_entrypoint():
    def exists(path):
        return os.path.exists(os.path.join(os.path.dirname(__file__), path))

    if exists('../gui/index.html'): # unfrozen development
        return '../gui/index.html'

    if exists('../Resources/gui/index.html'): # frozen py2app
        return '../Resources/gui/index.html'

    if exists('./gui/index.html'):
        return './gui/index.html'

    raise Exception('No index.html found')


def set_interval(interval):
    def decorator(function):
        def wrapper(*args, **kwargs):
            stopped = threading.Event()

            def loop(): # executed in another thread
                while not stopped.wait(interval): # until stopped
                    function(*args, **kwargs)

            t = threading.Thread(target=loop)
            t.daemon = True # stop if the program exits
            t.start()
            return stopped
        return wrapper
    return decorator


def get_entrypoint():

    def exists(path):
        return os.path.exists(os.path.join(os.path.dirname(__file__), path))

    if exists('../gui/index.html'): # unfrozen development
        return '../gui/index.html'

    if exists('../Resources/gui/index.html'): # frozen py2app
        return '../Resources/gui/index.html'

    if exists('./gui/index.html'):
        return './gui/index.html'

    raise Exception('No index.html found')


entry = get_entrypoint()

@set_interval(1)
def update_ticker():
    if len(webview.windows) > 0:
        webview.windows[0].evaluate_js('window.pywebview.state.setTicker("%d")' % time())


if __name__ == '__main__':
    window = webview.create_window('pywebview-react boilerplate', entry, js_api=Api())
    webview.start(debug=True)
