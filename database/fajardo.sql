PGDMP      7            
    {            fajardo    16.0    16.0 R    #           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            $           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            %           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            &           1262    16405    fajardo    DATABASE     �   CREATE DATABASE fajardo WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_United States.1252';
    DROP DATABASE fajardo;
                postgres    false            �            1259    25141    person    TABLE     �   CREATE TABLE public.person (
    id_p integer NOT NULL,
    name character varying NOT NULL,
    last_name character varying NOT NULL,
    age integer NOT NULL,
    gender "char" NOT NULL,
    ci character varying NOT NULL
);
    DROP TABLE public.person;
       public         heap    postgres    false            �            1259    25150    athlete    TABLE     �   CREATE TABLE public.athlete (
    maximum_load integer NOT NULL,
    category character varying NOT NULL,
    new_entry boolean NOT NULL,
    id_t integer NOT NULL
)
INHERITS (public.person);
    DROP TABLE public.athlete;
       public         heap    postgres    false    231            �            1259    16736 
   capability    TABLE     `   CREATE TABLE public.capability (
    id_c integer NOT NULL,
    name character(200) NOT NULL
);
    DROP TABLE public.capability;
       public         heap    postgres    false            �            1259    16735    capabilities_id_c_seq    SEQUENCE     �   CREATE SEQUENCE public.capabilities_id_c_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ,   DROP SEQUENCE public.capabilities_id_c_seq;
       public          postgres    false    227            '           0    0    capabilities_id_c_seq    SEQUENCE OWNED BY     M   ALTER SEQUENCE public.capabilities_id_c_seq OWNED BY public.capability.id_c;
          public          postgres    false    226            �            1259    25208    coach    TABLE     �   CREATE TABLE public.coach (
    category character varying NOT NULL,
    years_of_exp integer NOT NULL
)
INHERITS (public.person);
    DROP TABLE public.coach;
       public         heap    postgres    false    231            �            1259    16712    exercise    TABLE     �   CREATE TABLE public.exercise (
    id_exer integer NOT NULL,
    name_exer character(250) NOT NULL,
    category character(30) NOT NULL
);
    DROP TABLE public.exercise;
       public         heap    postgres    false            �            1259    16711    excercise_id_exer_seq    SEQUENCE     �   CREATE SEQUENCE public.excercise_id_exer_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ,   DROP SEQUENCE public.excercise_id_exer_seq;
       public          postgres    false    223            (           0    0    excercise_id_exer_seq    SEQUENCE OWNED BY     N   ALTER SEQUENCE public.excercise_id_exer_seq OWNED BY public.exercise.id_exer;
          public          postgres    false    222            �            1259    25200 	   executive    TABLE     <   CREATE TABLE public.executive (
)
INHERITS (public.person);
    DROP TABLE public.executive;
       public         heap    postgres    false    231            �            1259    25139    person_id_p_seq    SEQUENCE     �   CREATE SEQUENCE public.person_id_p_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.person_id_p_seq;
       public          postgres    false    231            )           0    0    person_id_p_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public.person_id_p_seq OWNED BY public.person.id_p;
          public          postgres    false    230            �            1259    16724    position    TABLE     _   CREATE TABLE public."position" (
    id_p integer NOT NULL,
    pos character(100) NOT NULL
);
    DROP TABLE public."position";
       public         heap    postgres    false            �            1259    16723    position_id_p_seq    SEQUENCE     �   CREATE SEQUENCE public.position_id_p_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.position_id_p_seq;
       public          postgres    false    225            *           0    0    position_id_p_seq    SEQUENCE OWNED BY     I   ALTER SEQUENCE public.position_id_p_seq OWNED BY public."position".id_p;
          public          postgres    false    224            �            1259    16549    rol    TABLE     X   CREATE TABLE public.rol (
    rol character(25) NOT NULL,
    "idR" integer NOT NULL
);
    DROP TABLE public.rol;
       public         heap    postgres    false            �            1259    16548    rol_idR_seq    SEQUENCE     �   CREATE SEQUENCE public."rol_idR_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 $   DROP SEQUENCE public."rol_idR_seq";
       public          postgres    false    216            +           0    0    rol_idR_seq    SEQUENCE OWNED BY     ?   ALTER SEQUENCE public."rol_idR_seq" OWNED BY public.rol."idR";
          public          postgres    false    215            �            1259    16700    sport    TABLE     ^   CREATE TABLE public.sport (
    id_sport integer NOT NULL,
    name character(20) NOT NULL
);
    DROP TABLE public.sport;
       public         heap    postgres    false            �            1259    16747 "   sport_athlete_capabilitie_position    TABLE     �   CREATE TABLE public.sport_athlete_capabilitie_position (
    id_c integer NOT NULL,
    id_s integer NOT NULL,
    id_p integer NOT NULL,
    id_a character varying NOT NULL
);
 6   DROP TABLE public.sport_athlete_capabilitie_position;
       public         heap    postgres    false            �            1259    16699    sports_id_sport_seq    SEQUENCE     �   CREATE SEQUENCE public.sports_id_sport_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 *   DROP SEQUENCE public.sports_id_sport_seq;
       public          postgres    false    221            ,           0    0    sports_id_sport_seq    SEQUENCE OWNED BY     J   ALTER SEQUENCE public.sports_id_sport_seq OWNED BY public.sport.id_sport;
          public          postgres    false    220            �            1259    16571    team    TABLE     ^   CREATE TABLE public.team (
    team_name character(50) NOT NULL,
    id_t integer NOT NULL
);
    DROP TABLE public.team;
       public         heap    postgres    false            �            1259    16871    team_id_t_seq    SEQUENCE     �   CREATE SEQUENCE public.team_id_t_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 $   DROP SEQUENCE public.team_id_t_seq;
       public          postgres    false    218            -           0    0    team_id_t_seq    SEQUENCE OWNED BY     ?   ALTER SEQUENCE public.team_id_t_seq OWNED BY public.team.id_t;
          public          postgres    false    229            �            1259    16555    us_rol    TABLE     W   CREATE TABLE public.us_rol (
    "idU" integer NOT NULL,
    "idR" integer NOT NULL
);
    DROP TABLE public.us_rol;
       public         heap    postgres    false            �            1259    16629    usr    TABLE     �   CREATE TABLE public.usr (
    user_n character varying NOT NULL,
    password character varying NOT NULL,
    deep_l integer NOT NULL,
    ci character varying NOT NULL
);
    DROP TABLE public.usr;
       public         heap    postgres    false            W           2604    25153    athlete id_p    DEFAULT     k   ALTER TABLE ONLY public.athlete ALTER COLUMN id_p SET DEFAULT nextval('public.person_id_p_seq'::regclass);
 ;   ALTER TABLE public.athlete ALTER COLUMN id_p DROP DEFAULT;
       public          postgres    false    230    232            U           2604    16739    capability id_c    DEFAULT     t   ALTER TABLE ONLY public.capability ALTER COLUMN id_c SET DEFAULT nextval('public.capabilities_id_c_seq'::regclass);
 >   ALTER TABLE public.capability ALTER COLUMN id_c DROP DEFAULT;
       public          postgres    false    226    227    227            Y           2604    25211 
   coach id_p    DEFAULT     i   ALTER TABLE ONLY public.coach ALTER COLUMN id_p SET DEFAULT nextval('public.person_id_p_seq'::regclass);
 9   ALTER TABLE public.coach ALTER COLUMN id_p DROP DEFAULT;
       public          postgres    false    234    230            X           2604    25203    executive id_p    DEFAULT     m   ALTER TABLE ONLY public.executive ALTER COLUMN id_p SET DEFAULT nextval('public.person_id_p_seq'::regclass);
 =   ALTER TABLE public.executive ALTER COLUMN id_p DROP DEFAULT;
       public          postgres    false    230    233            S           2604    16715    exercise id_exer    DEFAULT     u   ALTER TABLE ONLY public.exercise ALTER COLUMN id_exer SET DEFAULT nextval('public.excercise_id_exer_seq'::regclass);
 ?   ALTER TABLE public.exercise ALTER COLUMN id_exer DROP DEFAULT;
       public          postgres    false    222    223    223            V           2604    25144    person id_p    DEFAULT     j   ALTER TABLE ONLY public.person ALTER COLUMN id_p SET DEFAULT nextval('public.person_id_p_seq'::regclass);
 :   ALTER TABLE public.person ALTER COLUMN id_p DROP DEFAULT;
       public          postgres    false    230    231    231            T           2604    16727    position id_p    DEFAULT     p   ALTER TABLE ONLY public."position" ALTER COLUMN id_p SET DEFAULT nextval('public.position_id_p_seq'::regclass);
 >   ALTER TABLE public."position" ALTER COLUMN id_p DROP DEFAULT;
       public          postgres    false    225    224    225            P           2604    16552    rol idR    DEFAULT     f   ALTER TABLE ONLY public.rol ALTER COLUMN "idR" SET DEFAULT nextval('public."rol_idR_seq"'::regclass);
 8   ALTER TABLE public.rol ALTER COLUMN "idR" DROP DEFAULT;
       public          postgres    false    216    215    216            R           2604    16703    sport id_sport    DEFAULT     q   ALTER TABLE ONLY public.sport ALTER COLUMN id_sport SET DEFAULT nextval('public.sports_id_sport_seq'::regclass);
 =   ALTER TABLE public.sport ALTER COLUMN id_sport DROP DEFAULT;
       public          postgres    false    220    221    221            Q           2604    16872 	   team id_t    DEFAULT     f   ALTER TABLE ONLY public.team ALTER COLUMN id_t SET DEFAULT nextval('public.team_id_t_seq'::regclass);
 8   ALTER TABLE public.team ALTER COLUMN id_t DROP DEFAULT;
       public          postgres    false    229    218                      0    25150    athlete 
   TABLE DATA           r   COPY public.athlete (id_p, name, last_name, age, gender, maximum_load, category, new_entry, id_t, ci) FROM stdin;
    public          postgres    false    232   pY                 0    16736 
   capability 
   TABLE DATA           0   COPY public.capability (id_c, name) FROM stdin;
    public          postgres    false    227   �Y                  0    25208    coach 
   TABLE DATA           _   COPY public.coach (id_p, name, last_name, age, gender, ci, category, years_of_exp) FROM stdin;
    public          postgres    false    234   �Y                 0    25200 	   executive 
   TABLE DATA           K   COPY public.executive (id_p, name, last_name, age, gender, ci) FROM stdin;
    public          postgres    false    233   LZ                 0    16712    exercise 
   TABLE DATA           @   COPY public.exercise (id_exer, name_exer, category) FROM stdin;
    public          postgres    false    223   �Z                 0    25141    person 
   TABLE DATA           H   COPY public.person (id_p, name, last_name, age, gender, ci) FROM stdin;
    public          postgres    false    231   $^                 0    16724    position 
   TABLE DATA           /   COPY public."position" (id_p, pos) FROM stdin;
    public          postgres    false    225   A^                 0    16549    rol 
   TABLE DATA           )   COPY public.rol (rol, "idR") FROM stdin;
    public          postgres    false    216   ^^                 0    16700    sport 
   TABLE DATA           /   COPY public.sport (id_sport, name) FROM stdin;
    public          postgres    false    221   {^                 0    16747 "   sport_athlete_capabilitie_position 
   TABLE DATA           T   COPY public.sport_athlete_capabilitie_position (id_c, id_s, id_p, id_a) FROM stdin;
    public          postgres    false    228   �^                 0    16571    team 
   TABLE DATA           /   COPY public.team (team_name, id_t) FROM stdin;
    public          postgres    false    218   �^                 0    16555    us_rol 
   TABLE DATA           .   COPY public.us_rol ("idU", "idR") FROM stdin;
    public          postgres    false    217   �^                 0    16629    usr 
   TABLE DATA           ;   COPY public.usr (user_n, password, deep_l, ci) FROM stdin;
    public          postgres    false    219   �^       .           0    0    capabilities_id_c_seq    SEQUENCE SET     D   SELECT pg_catalog.setval('public.capabilities_id_c_seq', 1, false);
          public          postgres    false    226            /           0    0    excercise_id_exer_seq    SEQUENCE SET     D   SELECT pg_catalog.setval('public.excercise_id_exer_seq', 36, true);
          public          postgres    false    222            0           0    0    person_id_p_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.person_id_p_seq', 52, true);
          public          postgres    false    230            1           0    0    position_id_p_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.position_id_p_seq', 1, false);
          public          postgres    false    224            2           0    0    rol_idR_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public."rol_idR_seq"', 1, false);
          public          postgres    false    215            3           0    0    sports_id_sport_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public.sports_id_sport_seq', 1, false);
          public          postgres    false    220            4           0    0    team_id_t_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.team_id_t_seq', 7, true);
          public          postgres    false    229            q           2606    25194    athlete athlete_ci_ci1_key 
   CONSTRAINT     `   ALTER TABLE ONLY public.athlete
    ADD CONSTRAINT athlete_ci_ci1_key UNIQUE (ci) INCLUDE (ci);
 D   ALTER TABLE ONLY public.athlete DROP CONSTRAINT athlete_ci_ci1_key;
       public            postgres    false    232            s           2606    25162    athlete athlete_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public.athlete
    ADD CONSTRAINT athlete_pkey PRIMARY KEY (id_p, ci);
 >   ALTER TABLE ONLY public.athlete DROP CONSTRAINT athlete_pkey;
       public            postgres    false    232    232            i           2606    16741    capability capabilities_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public.capability
    ADD CONSTRAINT capabilities_pkey PRIMARY KEY (id_c);
 F   ALTER TABLE ONLY public.capability DROP CONSTRAINT capabilities_pkey;
       public            postgres    false    227            m           2606    25192 	   person ci 
   CONSTRAINT     O   ALTER TABLE ONLY public.person
    ADD CONSTRAINT ci UNIQUE (ci) INCLUDE (ci);
 3   ALTER TABLE ONLY public.person DROP CONSTRAINT ci;
       public            postgres    false    231            w           2606    25215    coach coach_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.coach
    ADD CONSTRAINT coach_pkey PRIMARY KEY (id_p, ci);
 :   ALTER TABLE ONLY public.coach DROP CONSTRAINT coach_pkey;
       public            postgres    false    234    234            e           2606    16717    exercise excercise_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.exercise
    ADD CONSTRAINT excercise_pkey PRIMARY KEY (id_exer);
 A   ALTER TABLE ONLY public.exercise DROP CONSTRAINT excercise_pkey;
       public            postgres    false    223            u           2606    25207    executive executive_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public.executive
    ADD CONSTRAINT executive_pkey PRIMARY KEY (id_p, ci);
 B   ALTER TABLE ONLY public.executive DROP CONSTRAINT executive_pkey;
       public            postgres    false    233    233            k           2606    25190 '   sport_athlete_capabilitie_position id_g 
   CONSTRAINT     y   ALTER TABLE ONLY public.sport_athlete_capabilitie_position
    ADD CONSTRAINT id_g PRIMARY KEY (id_c, id_s, id_p, id_a);
 Q   ALTER TABLE ONLY public.sport_athlete_capabilitie_position DROP CONSTRAINT id_g;
       public            postgres    false    228    228    228    228            o           2606    25160    person person_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.person
    ADD CONSTRAINT person_pkey PRIMARY KEY (ci, id_p);
 <   ALTER TABLE ONLY public.person DROP CONSTRAINT person_pkey;
       public            postgres    false    231    231            g           2606    16729    position position_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public."position"
    ADD CONSTRAINT position_pkey PRIMARY KEY (id_p);
 B   ALTER TABLE ONLY public."position" DROP CONSTRAINT position_pkey;
       public            postgres    false    225            [           2606    16554    rol rol_pkey 
   CONSTRAINT     M   ALTER TABLE ONLY public.rol
    ADD CONSTRAINT rol_pkey PRIMARY KEY ("idR");
 6   ALTER TABLE ONLY public.rol DROP CONSTRAINT rol_pkey;
       public            postgres    false    216            c           2606    16705    sport sports_pkey 
   CONSTRAINT     U   ALTER TABLE ONLY public.sport
    ADD CONSTRAINT sports_pkey PRIMARY KEY (id_sport);
 ;   ALTER TABLE ONLY public.sport DROP CONSTRAINT sports_pkey;
       public            postgres    false    221            _           2606    16877    team team_pkey 
   CONSTRAINT     ]   ALTER TABLE ONLY public.team
    ADD CONSTRAINT team_pkey PRIMARY KEY (id_t) INCLUDE (id_t);
 8   ALTER TABLE ONLY public.team DROP CONSTRAINT team_pkey;
       public            postgres    false    218            ]           2606    16559    us_rol us_rol_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.us_rol
    ADD CONSTRAINT us_rol_pkey PRIMARY KEY ("idU", "idR");
 <   ALTER TABLE ONLY public.us_rol DROP CONSTRAINT us_rol_pkey;
       public            postgres    false    217    217            a           2606    25221    usr usr_pkey 
   CONSTRAINT     W   ALTER TABLE ONLY public.usr
    ADD CONSTRAINT usr_pkey PRIMARY KEY (ci) INCLUDE (ci);
 6   ALTER TABLE ONLY public.usr DROP CONSTRAINT usr_pkey;
       public            postgres    false    219            x           2606    16565    us_rol idRFK    FK CONSTRAINT     l   ALTER TABLE ONLY public.us_rol
    ADD CONSTRAINT "idRFK" FOREIGN KEY ("idR") REFERENCES public.rol("idR");
 8   ALTER TABLE ONLY public.us_rol DROP CONSTRAINT "idRFK";
       public          postgres    false    4699    217    216            y           2606    25195 '   sport_athlete_capabilitie_position id_a    FK CONSTRAINT     �   ALTER TABLE ONLY public.sport_athlete_capabilitie_position
    ADD CONSTRAINT id_a FOREIGN KEY (id_a) REFERENCES public.athlete(ci) NOT VALID;
 Q   ALTER TABLE ONLY public.sport_athlete_capabilitie_position DROP CONSTRAINT id_a;
       public          postgres    false    232    228    4721            z           2606    16757 '   sport_athlete_capabilitie_position id_c    FK CONSTRAINT     �   ALTER TABLE ONLY public.sport_athlete_capabilitie_position
    ADD CONSTRAINT id_c FOREIGN KEY (id_c) REFERENCES public.capability(id_c) NOT VALID;
 Q   ALTER TABLE ONLY public.sport_athlete_capabilitie_position DROP CONSTRAINT id_c;
       public          postgres    false    228    4713    227            {           2606    16767 '   sport_athlete_capabilitie_position id_p    FK CONSTRAINT     �   ALTER TABLE ONLY public.sport_athlete_capabilitie_position
    ADD CONSTRAINT id_p FOREIGN KEY (id_p) REFERENCES public."position"(id_p) NOT VALID;
 Q   ALTER TABLE ONLY public.sport_athlete_capabilitie_position DROP CONSTRAINT id_p;
       public          postgres    false    225    4711    228            |           2606    16762 '   sport_athlete_capabilitie_position id_s    FK CONSTRAINT     �   ALTER TABLE ONLY public.sport_athlete_capabilitie_position
    ADD CONSTRAINT id_s FOREIGN KEY (id_s) REFERENCES public.sport(id_sport) NOT VALID;
 Q   ALTER TABLE ONLY public.sport_athlete_capabilitie_position DROP CONSTRAINT id_s;
       public          postgres    false    4707    221    228            }           2606    25222    person person_ci_fkey    FK CONSTRAINT     w   ALTER TABLE ONLY public.person
    ADD CONSTRAINT person_ci_fkey FOREIGN KEY (ci) REFERENCES public.usr(ci) NOT VALID;
 ?   ALTER TABLE ONLY public.person DROP CONSTRAINT person_ci_fkey;
       public          postgres    false    4705    219    231               L   x�31�t+J���L�42���42��*-K����,�4�40604027542�25�*-N,N)��4�+NCQl����� �[            x������ � �          S   x�-�-� P��0K�-�'K���� ���g��s�<�8����u�	5d��qH1����^P�}4���qt�}U�.         O   x�31�tv�tLI�46�t�40604027542�2��t+J���tJ��I-.I-�42��EUcΙ�"od4Y�1W� �gW         i  x��X=o�0��_�1E����9�M�t�r��1]J(*��o��C�v���I�I��LԵ��bʢ��㽻{L��
d��rE�.�oj�hр�B�.�O��x)������"�XX���N2`�
��? ���@�x�T���A��sĒ�A��n���^r|0��̥�%��ذ���(:��8U*(�<��60�)��c[J�)��ҠUE��)�Jm8�)�|2���P�FRe�"Z=�Sv���4�U;�E�9c��K��6�TJ��E5���.�����a^�DSn��#���r
1��T�R��5F5��CŰ�f��(�>�W%���W<6���x�I��.���
��`P�xSN�~BU�hFRH���@��'���w��l�����������fg����RśG?�yj�+���ے���$4̢|�W��?Q#:���� j`�`Mĝ�F��(VB�^�O��-Ν�{&�����E�.W��� ��E҇|��ʢ&g��E��!��j(����ι��-n����l��l�i�!���^6U�9Y5Ԣ���d���c;fQp쵾m�T-�:V�S���j��RH4Iȟ���lQp���{Y���ٜS�bQp�C�b��9�BM�m���9}�M��5�'��-V7�=�V�TKڗ_�8����������S����_7�նX�3���d�-�s];�u�<Hl9	O��AhR�Ԋ�dܴ�II�}�?j�A
��𔷃���&���mw��Π�*48�{)��_�F�I��R�Q�,�M�sO������J[�{�Iw��V���Eg�^�C��=i�%�!��Usg�Ԡ�A诶Rz'-λ�N���Ͷ�            x������ � �            x������ � �            x������ � �            x������ � �            x������ � �            x�ssvq	v""�9W� +��            x������ � �         _   x�+(*MMJL,N"�0�Ӑ����������Ș*��@r&�f��\iE�yٜ�I�)D&>�Fs�t ����@�AmBs�h� �+&     