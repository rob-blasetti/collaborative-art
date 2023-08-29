const quotes = [
    {"id": 1, "text": "O SON OF SPIRIT! My first counsel is this: Possess a pure, kindly and radiant heart, that thine may be a sovereignty ancient, imperishable and everlasting."},
    {"id": 2, "text": "O SON OF SPIRIT! The best beloved of all things in My sight is Justice; turn not away therefrom if thou desirest Me, and neglect it not that I may confide in thee. By its aid thou shalt see with thine own eyes and not through the eyes of others, and shalt know of thine own knowledge and not through the knowledge of thy neighbor. Ponder this in thy heart; how it behooveth thee to be. Verily justice is My gift to thee and the sign of My loving-kindness. Set it then before thine eyes."},
    {"id": 3, "text": "O SON OF MAN! Veiled in My immemorial being and in the ancient eternity of My essence, I knew My love for thee; therefore I created thee, have engraved on thee Mine image and revealed to thee My beauty."},
    {"id": 4, "text": "O SON OF MAN! I loved thy creation, hence I created thee. Wherefore, do thou love Me, that I may name thy name and fill thy soul with the spirit of life."},
    {"id": 5, "text": "O SON OF BEING! Love Me, that I may love thee. If thou lovest Me not, My love can in no wise reach thee. Know this, O servant."},
    {"id": 6, "text": "O SON OF BEING! Thy Paradise is My love; thy heavenly home, reunion with Me. Enter therein and tarry not. This is that which hath been destined for thee in Our kingdom above and Our exalted dominion."},
    {"id": 7, "text": "O SON OF MAN! If thou lovest Me, turn away from thyself; and if thou seekest My pleasure, regard not thine own; that thou mayest die in Me and I may eternally live in thee."},
    {"id": 8, "text": "O SON OF SPIRIT! There is no peace for thee save by renouncing thyself and turning unto Me; for it behooveth thee to glory in My name, not in thine own; to put thy trust in Me and not in thyself, since I desire to be loved alone and above all that is."},
    {"id": 9, "text": "O SON OF BEING! My love is My stronghold; he that entereth therein is safe and secure, and he that turneth away shall surely stray and perish."},
    {"id": 10, "text": "O SON OF UTTERANCE! Thou art My stronghold; enter therein that thou mayest abide in safety. My love is in thee, know it, that thou mayest find Me near unto thee."},
    {"id": 11, "text": "O SON OF BEING! Thou art My lamp and My light is in thee. Get thou from it thy radiance and seek none other than Me. For I have created thee rich and have bountifully shed My favor upon thee."},
    {"id": 12, "text": "O SON OF BEING! With the hands of power I made thee and with the fingers of strength I created thee; and within thee have I placed the essence of My light. Be thou content with it and seek naught else, for My work is perfect and My command is binding. Question it not, nor have a doubt thereof."},
    {"id": 13, "text": "O SON OF SPIRIT! I created thee rich, why dost thou bring thyself down to poverty? Noble I made thee, wherewith dost thou abase thyself? Out of the essence of knowledge I gave thee being, why seekest thou enlightenment from anyone beside Me? Out of the clay of love I molded thee, how dost thou busy thyself with another? Turn thy sight unto thyself, that thou mayest find Me standing within thee, mighty, powerful and self-subsisting."},
    {"id": 14, "text": "O SON OF MAN! Thou art My dominion and My dominion perisheth not; wherefore fearest thou thy perishing? Thou art My light and My light shall never be extinguished; why dost thou dread extinction? Thou art My glory and My glory fadeth not; thou art My robe and My robe shall never be outworn. Abide then in thy love for Me, that thou mayest find Me in the realm of glory."},
    {"id": 15, "text": "O SON OF UTTERANCE! Turn thy face unto Mine and renounce all save Me; for My sovereignty endureth and My dominion perisheth not. If thou seekest another than Me, yea, if thou searchest the universe forevermore, thy quest will be in vain."},
    {"id": 16, "text": "O SON OF LIGHT! Forget all save Me and commune with My spirit. This is of the essence of My command, therefore turn unto it."},
    {"id": 17, "text": "O SON OF MAN! Be thou content with Me and seek no other helper. For none but Me can ever suffice thee."},
    {"id": 18, "text": "O SON OF SPIRIT! Ask not of Me that which We desire not for thee, then be content with what We have ordained for thy sake, for this is that which profiteth thee, if therewith thou dost content thyself."},
    {"id": 19, "text": "O SON OF THE WONDROUS VISION! I have breathed within thee a breath of My own Spirit, that thou mayest be My lover. Why hast thou forsaken Me and sought a beloved other than Me?"},
    {"id": 20, "text": "O SON OF SPIRIT! My claim on thee is great, it cannot be forgotten. My grace to thee is plenteous, it cannot be veiled. My love has made in thee its home, it cannot be concealed. My light is manifest to thee, it cannot be obscured."},
    {"id": 21, "text": "O SON OF MAN! Upon the tree of effulgent glory I have hung for thee the choicest fruits, wherefore hast thou turned away and contented thyself with that which is less good? Return then unto that which is better for thee in the realm on high."},
    {"id": 22, "text": "O SON OF SPIRIT! Noble have I created thee, yet thou hast abased thyself. Rise then unto that for which thou wast created."},
    {"id": 23, "text": "O SON OF THE SUPREME! To the eternal I call thee, yet thou dost seek that which perisheth. What hath made thee turn away from Our desire and seek thine own?"},
    {"id": 24, "text": "O SON OF MAN! Transgress not thy limits, nor claim that which beseemeth thee not. Prostrate thyself before the countenance of thy God, the Lord of might and power."},
    {"id": 25, "text": "O SON OF SPIRIT! Vaunt not thyself over the poor, for I lead him on his way and behold thee in thy evil plight and confound thee forevermore."},
    {"id": 26, "text": "O SON OF BEING! How couldst thou forget thine own faults and busy thyself with the faults of others? Whoso doeth this is accursed of Me."},
    {"id": 27, "text": "O SON OF MAN! Breathe not the sins of others so long as thou art thyself a sinner. Shouldst thou transgress this command, accursed wouldst thou be, and to this I bear witness."},
    {"id": 28, "text": "O SON OF SPIRIT! Know thou of a truth: He that biddeth men be just and himself committeth iniquity is not of Me, even though he bear My name."},
    {"id": 29, "text": "O SON OF BEING! Ascribe not to any soul that which thou wouldst not have ascribed to thee, and say not that which thou doest not. This is My command unto thee, do thou observe it."},
    {"id": 30, "text": "O SON OF MAN! Deny not My servant should he ask anything from thee, for his face is My face; be then abashed before Me."},
    {"id": 31, "text": "O SON OF BEING! Bring thyself to account each day ere thou art summoned to a reckoning; for death, unheralded, shall come upon thee and thou shalt be called to give account for thy deeds."},
    {"id": 32, "text": "O SON OF THE SUPREME! I have made death a messenger of joy to thee. Wherefore dost thou grieve? I made the light to shed on thee its splendor. Why dost thou veil thyself therefrom?"},
    {"id": 33, "text": "O SON OF SPIRIT! With the joyful tidings of light I hail thee: rejoice! To the court of holiness I summon thee; abide therein that thou mayest live in peace forevermore."},
    {"id": 34, "text": "O SON OF SPIRIT! The spirit of holiness beareth unto thee the joyful tidings of reunion; wherefore dost thou grieve? The spirit of power confirmeth thee in His cause; why dost thou veil thyself? The light of His countenance doth lead thee; how canst thou go astray?"},
    {"id": 35, "text": "O SON OF MAN! Sorrow not save that thou art far from Us. Rejoice not save that thou art drawing near and returning unto Us."},
    {"id": 36, "text": "O SON OF MAN! Rejoice in the gladness of thine heart, that thou mayest be worthy to meet Me and to mirror forth My beauty."},
    {"id": 37, "text": "O SON OF MAN! Divest not thyself of My beauteous robe, and forfeit not thy portion from My wondrous fountain, lest thou shouldst thirst forevermore."},
    {"id": 38, "text": "O SON OF BEING! Walk in My statutes for love of Me and deny thyself that which thou desirest if thou seekest My pleasure."},
    {"id": 39, "text": "O SON OF MAN! Neglect not My commandments if thou lovest My beauty, and forget not My counsels if thou wouldst attain My good pleasure."},
    {"id": 40, "text": "O SON OF MAN! Wert thou to speed through the immensity of space and traverse the expanse of heaven, yet thou wouldst find no rest save in submission to Our command and humbleness before Our Face."},
    {"id": 41, "text": "O SON OF MAN! Magnify My cause that I may reveal unto thee the mysteries of My greatness and shine upon thee with the light of eternity."},
    {"id": 42, "text": "O SON OF MAN! Humble thyself before Me, that I may graciously visit thee. Arise for the triumph of My cause, that while yet on earth thou mayest obtain the victory."},
    {"id": 43, "text": "O SON OF BEING! Make mention of Me on My earth, that in My heaven I may remember thee, thus shall Mine eyes and thine be solaced."},
    {"id": 44, "text": "O SON OF THE THRONE! Thy hearing is My hearing, hear thou therewith. Thy sight is My sight, do thou see therewith, that in thine inmost soul thou mayest testify unto My exalted sanctity, and I within Myself may bear witness unto an exalted station for thee."},
    {"id": 45, "text": "O SON OF BEING! Seek a martyr’s death in My path, content with My pleasure and thankful for that which I ordain, that thou mayest repose with Me beneath the canopy of majesty behind the tabernacle of glory."},
    {"id": 46, "text": "O SON OF MAN! Ponder and reflect. Is it thy wish to die upon thy bed, or to shed thy lifeblood on the dust, a martyr in My path, and so become the manifestation of My command and the revealer of My light in the highest paradise? Judge thou aright, O servant!"},
    {"id": 47, "text": "O SON OF MAN! By My beauty! To tinge thy hair with thy blood is greater in My sight than the creation of the universe and the light of both worlds. Strive then to attain this, O servant!"},
    {"id": 48, "text": "O SON OF MAN! For everything there is a sign. The sign of love is fortitude under My decree and patience under My trials."},
    {"id": 49, "text": "O SON OF MAN! The true lover yearneth for tribulation even as doth the rebel for forgiveness and the sinful for mercy."},
    {"id": 50, "text": "O SON OF MAN! If adversity befall thee not in My path, how canst thou walk in the ways of them that are content with My pleasure? If trials afflict thee not in thy longing to meet Me, how wilt thou attain the light in thy love for My beauty?"},
    {"id": 51, "text": "O SON OF MAN! My calamity is My providence, outwardly it is fire and vengeance, but inwardly it is light and mercy. Hasten thereunto that thou mayest become an eternal light and an immortal spirit. This is My command unto thee, do thou observe it."},
    {"id": 52, "text": "O SON OF MAN! Should prosperity befall thee, rejoice not, and should abasement come upon thee, grieve not, for both shall pass away and be no more."},
    {"id": 53, "text": "O SON OF BEING! If poverty overtake thee, be not sad; for in time the Lord of wealth shall visit thee. Fear not abasement, for glory shall one day rest on thee."},
    {"id": 54, "text": "O SON OF BEING! If thine heart be set upon this eternal, imperishable dominion, and this ancient, everlasting life, forsake this mortal and fleeting sovereignty."},
    {"id": 55, "text": "O SON OF BEING! Busy not thyself with this world, for with fire We test the gold, and with gold We test Our servants."},
    {"id": 56, "text": "O SON OF MAN! Thou dost wish for gold and I desire thy freedom from it. Thou thinkest thyself rich in its possession, and I recognize thy wealth in thy sanctity therefrom. By My life! This is My knowledge, and that is thy fancy; how can My way accord with thine?"},
    {"id": 57, "text": "O SON OF MAN! Bestow My wealth upon My poor, that in heaven thou mayest draw from stores of unfading splendor and treasures of imperishable glory. But by My life! To offer up thy soul is a more glorious thing couldst thou but see with Mine eye."},
    {"id": 58, "text": "O SON OF MAN! The temple of being is My throne; cleanse it of all things, that there I may be established and there I may abide."},
    {"id": 59, "text": "O SON OF BEING! Thy heart is My home; sanctify it for My descent. Thy spirit is My place of revelation; cleanse it for My manifestation."},
    {"id": 60, "text": "O SON OF MAN! Put thy hand into My bosom, that I may rise above thee, radiant and resplendent."},
    {"id": 61, "text": "O SON OF MAN! Ascend unto My heaven, that thou mayest obtain the joy of reunion, and from the chalice of imperishable glory quaff the peerless wine."},
    {"id": 62, "text": "O SON OF MAN! Many a day hath passed over thee whilst thou hast busied thyself with thy fancies and idle imaginings. How long art thou to slumber on thy bed? Lift up thy head from slumber, for the Sun hath risen to the zenith, haply it may shine upon thee with the light of beauty."},
    {"id": 63, "text": "O SON OF MAN! The light hath shone on thee from the horizon of the sacred Mount and the spirit of enlightenment hath breathed in the Sinai of thy heart. Wherefore, free thyself from the veils of idle fancies and enter into My court, that thou mayest be fit for everlasting life and worthy to meet Me. Thus may death not come upon thee, neither weariness nor trouble."},
    {"id": 64, "text": "O SON OF MAN! My eternity is My creation, I have created it for thee. Make it the garment of thy temple. My unity is My handiwork; I have wrought it for thee; clothe thyself therewith, that thou mayest be to all eternity the revelation of My everlasting being."},
    {"id": 65, "text": "O SON OF MAN! My majesty is My gift to thee, and My grandeur the token of My mercy unto thee. That which beseemeth Me none shall understand, nor can anyone recount. Verily, I have preserved it in My hidden storehouses and in the treasuries of My command, as a sign of My loving-kindness unto My servants and My mercy unto My people."},
    {"id": 66, "text": "O CHILDREN OF THE DIVINE AND INVISIBLE ESSENCE! Ye shall be hindered from loving Me and souls shall be perturbed as they make mention of Me. For minds cannot grasp Me nor hearts contain Me."},
    {"id": 67, "text": "O SON OF BEAUTY! By My spirit and by My favor! By My mercy and by My beauty! All that I have revealed unto thee with the tongue of power, and have written for thee with the pen of might, hath been in accordance with thy capacity and understanding, not with My state and the melody of My voice."},
    {"id": 68, "text": "O CHILDREN OF MEN! Know ye not why We created you all from the same dust? That no one should exalt himself over the other. Ponder at all times in your hearts how ye were created. Since We have created you all from one same substance it is incumbent on you to be even as one soul, to walk with the same feet, eat with the same mouth and dwell in the same land, that from your inmost being, by your deeds and actions, the signs of oneness and the essence of detachment may be made manifest. Such is My counsel to you, O concourse of light! Heed ye this counsel that ye may obtain the fruit of holiness from the tree of wondrous glory."},
    {"id": 69, "text": "O YE SONS OF SPIRIT! Ye are My treasury, for in you I have treasured the pearls of My mysteries and the gems of My knowledge. Guard them from the strangers amidst My servants and from the ungodly amongst My people."},
    {"id": 70, "text": "O SON OF HIM THAT STOOD BY HIS OWN ENTITY IN THE KINGDOM OF HIS SELF! Know thou, that I have wafted unto thee all the fragrances of holiness, have fully revealed to thee My word, have perfected through thee My bounty and have desired for thee that which I have desired for My Self. Be then content with My pleasure and thankful unto Me."},
    {"id": 71, "text": "O SON OF MAN! Write all that We have revealed unto thee with the ink of light upon the tablet of thy spirit. Should this not be in thy power, then make thine ink of the essence of thy heart. If this thou canst not do, then write with that crimson ink that hath been shed in My path. Sweeter indeed is this to Me than all else, that its light may endure forever."}
];

export default quotes;